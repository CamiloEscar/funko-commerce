import { OrderInput } from "../interfaces";
import { supabase } from "../supabase/client";

export const createOrder = async (order: OrderInput) => {
  //obtener el usuario autenticado + cliente de la tabla customers
  const { data, error: errorUser } = await supabase.auth.getUser();
  if (errorUser) {
    console.error("Error al obtener el usuario autenticado");
    throw new Error("Error al obtener el usuario autenticado");
  }

  const userId = data.user.id;

  const { data: customer, error: errorCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (errorCustomer) {
    console.error("Error al obtener el cliente");
    throw new Error("Error al obtener el cliente");
  }

  const customerId = customer.id;

  //2: verificar que haya stock suficiente para cada variante en el carrito
  for (const item of order.cartItems) {
    const { data: variantData, error: variantError } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single();

    if (variantError) {
      console.error("Error al obtener el stock del producto");
      throw new Error("Error al obtener el stock del producto");
    }

    if (variantData.stock < item.quantity) {
      throw new Error("No hay suficiente stock para el producto");
    }
  }

  //3: guardar la direccion del envio
  const { data: addressData, error: addressError } = await supabase
    .from("addresses")
    .insert({
      address_line1: order.address.addressLine1,
      address_line2: order.address.addressLine2,
      city: order.address.city,
      state: order.address.state,
      postal_code: order.address.postalCode,
      country: order.address.country,
      customer_id: customerId,
    })
    .select()
    .single();

  if (addressError) {
    console.error("Error al guardar la direccion del envio");
    throw new Error("Error al guardar la direccion del envio");
  }

  //4 crear la orden
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerId,
      address_id: addressData.id,
      total_amount: order.totalAmount,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) {
    console.error(orderError);
    throw new Error(orderError.message);
  }

  //5. Guardar los datos
  const orderItems = order.cartItems.map((item) => ({
    order_id: orderData.id,
    variant_id: item.variantId,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (orderItemsError) {
    console.error("Error al guardar los items de la orden");
    throw new Error("Error al guardar los items de la orden");
  }

  //6: actualizar el stock de los variantes
  for (const item of order.cartItems) {
    //obtencion del stock actual
    const { data: variantData } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single();

    if (!variantData) {
      console.error("Error al obtener el stock del producto");
      throw new Error("Error al obtener el stock del producto");
    }

    const newStock = variantData.stock - item.quantity;

    const { error: updatedStockError } = await supabase
      .from("variants")
      .update({
        stock: newStock,
      })
      .eq("id", item.variantId);
    if (updatedStockError) {
      console.error("Error al actualizar el stock del producto");
      throw new Error("Error al actualizar el stock del producto");
    }
  }

  return orderData;
};

export const getOrdersByCustomerId = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error al obtener el usuario autenticado");
    throw new Error("Error al obtener el usuario autenticado");
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", data.user.id)
    .single();

  if (customerError) {
    console.error("Error al obtener el cliente");
    throw new Error("Error al obtener el cliente");
  }

  const customerId = customer.id;

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at")
    .eq("customer_id", customerId)
    .order("created_at", {
      ascending: false,
    });

  if (ordersError) {
    console.error("Error al obtener las ordenes");
    throw new Error("Error al obtener las ordenes");
  }

  return orders;
};

export const getOrderById = async (orderId: number) => {
  const { data, error: errorUser } = await supabase.auth.getUser();

  if (errorUser) {
    console.error("Error al obtener el usuario autenticado");
    throw new Error("Error al obtener el usuario autenticado");
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", data.user.id)
    .single();

  if (customerError) {
    console.error("Error al obtener el cliente");
    throw new Error("Error al obtener el cliente");
  }

  const customerId = customer.id;

  const {data: order, error} = await supabase
    .from("orders")
    .select(
      "*, addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name, storage, products(name, images)))"
    )
    .eq("customer_id", customerId)
    .eq("id", orderId)
    .single();

    if(error){
      console.error("Error al obtener la orden");
      throw new Error("Error al obtener la orden");
    }

    return {
      customer: {
        email: order?.customers.email,
        full_name: order.customers.full_name,
      },
      totalAmount: order.total_amount,
      status: order.status,
      created_at: order.created_at,
      address: {
        addressLine1: order.addresses?.address_line1,
        addressLine2: order.addresses?.address_line2,
        city: order.addresses?.city,
        state: order.addresses?.state,
        postalCode: order.addresses?.postal_code,
        country: order.addresses?.country
      },
      orderItems: order.order_items.map((item) => ({
        quantity: item.quantity,
        price: item.price,
        color_name: item.variants?.color_name,
        storage: item.variants?.storage,
        productName: item.variants?.products?.name,
        productImage: item.variants?.products?.images[0]
      }))
    }
};
