import Image from 'next/image';

const Login = () => {
  return (
    <div className="container_login">
      <form className="form_login">
      <Image
            src="https://www.newwavepower.net/wp-content/themes/nwp/images/logo.png"
            alt="Logo"
            width={200} // Ajusta el tamaño según necesites
            height={80} 
            className="logo"
        />
        <p id="heading">¡Bienvenido!</p>
        <div className="field_login">
          <input id="email" name="email" autoComplete="off" placeholder="Nombre de Usuario" className="input-field" type="text" required />
        </div>
        <div className="field_login">
          <input id="password" name="password" placeholder="Contraseña" className="input-field" type="password" required />
        </div>
        <div className="btn">
          <button type="submit" className="button1">Login</button>
          <button type="button" className="button2">Crear Usuario</button>
        </div>
        <button type="button" className="button3">forgot pwd</button>
      </form>
    </div>
  );
};

export default Login;
