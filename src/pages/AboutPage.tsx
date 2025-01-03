
export const AboutPage = () => {
  return (
    <div className="space-y-5">
      
      <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">
        Nuestra empresa
      </h1>

      <img src="https://cdn.shopify.com/s/files/1/0013/6105/1705/files/00_1625d65f-e072-42da-b832-23c98c55d739.jpg?v=1707035920" alt="Imagen de fondo" />
      <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800">
        <p>
          Funkos es una tienda en linea que se dedica a la venta de funkos, concebida en una reunion con clientes conocidos en la facultad UADER. Nuestro objetivo es ofrecer a nuestros clientes la mejor calidad y precio en funkos. Contamos con un equipo de profesionales que se encargan de seleccionar los mejores productos para ti.
        </p>
        <p>
          En FunkoShop podras encontrar una amplia variedad de funkos de las mejores marcas y modelos. Ademas, contamos con un servicio de atencion al cliente que te ayudara a resolver cualquier duda que tengas sobre nuestros productos.
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          No esperes más y compra tu funko en FunkoShop
        </h2>
        <p>
          Para más información, no dudes en ponerte en contacto con nosotros, a través de nuestro correo electrónico:
          <a href="mailto:contacto@funkoshop.com" className="underline hover:text-blue-500">
            contacto@funkoshop.com
          </a> o llamado al <a href="tel: 3442475466">3442475466</a>
        </p>
      </div>
    </div>
  )
}
