import { supabase } from "../supabase/client";
interface IAuthLogin {
  email: string;
  password: string;
}

interface IAuthRegister {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export const signUp = async ({
  email,
  password,
  fullName,
  phone,
}: IAuthRegister) => {
  try {
    // 1: registrar usuario
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error(error);
    }

    const userId = data.user?.id;

    if (!userId) {
      throw new Error("Error al obtener el id del usuario");
    }

    //2: autenticar al usuario
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      console.error("email o contraseña incorrecta");
    }

    //3: insertar el rol por defecto - CLIENTE
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: userId,
      role: "customer",
    });
    if (roleError) {
      console.error("Error al insertar el rol del usuario");
    }

    //4: insertar los datos del usuario en la tabla cliente
    const { error: customerError } = await supabase.from("customers").insert({
      user_id: userId,
      full_name: fullName,
      phone: phone || null,
      email,
    });
    if (customerError) {
      console.error(
        "Error al insertar los datos del usuario en la tabla cliente"
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al registrar");
  }
};

export const signIn = async ({ email, password }: IAuthLogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("email o contraseña incorrecta");
    throw new Error("Error al iniciar sesión");
  }
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error al cerrar sesión");
    throw new Error("Error al cerrar sesión");
  }
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error al obtener la sesión");
    throw new Error("Error al obtener la sesión");
  }
  return data;
};

export const getUserData = async (userId: string) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log(error);
    throw new Error("error al obtener los datos del usuario");
  }

  return data;
};
