<?php
session_start();

if (!file_exists("usuarios.json")) {
    file_put_contents("usuarios.json", json_encode([]));
}

$usuarios = json_decode(file_get_contents("usuarios.json"), true);
$mensaje = "";

// Si se envió el formulario de registro
if (isset($_POST["accion"]) && $_POST["accion"] === "registrar") {
    $usuario = $_POST["usuario"];
    $clave = $_POST["clave"];

    if (isset($usuarios[$usuario])) {
        $mensaje = "⚠️ El usuario ya existe.";
    } else {
        $usuarios[$usuario] = password_hash($clave, PASSWORD_DEFAULT);
        file_put_contents("usuarios.json", json_encode($usuarios, JSON_PRETTY_PRINT));
        $mensaje = "✅ Registro exitoso. Ahora podés iniciar sesión.";
    }
}

if (isset($_POST["accion"]) && $_POST["accion"] === "login") {
    $usuario = $_POST["usuario"];
    $clave = $_POST["clave"];

    if (isset($usuarios[$usuario]) && password_verify($clave, $usuarios[$usuario])) {
        $_SESSION["usuario"] = $usuario;
        header("Location: ../pag_inicial/index.html");
    } else {
        $mensaje = "❌ Usuario o contraseña incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Acceso a PokeORT</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; }
        .container { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        input { display: block; margin: 0.5rem 0; padding: 0.5rem; width: 100%; }
        button { padding: 0.5rem 1rem; margin-top: 0.5rem; }
        .mensaje { margin-top: 1rem; color: darkred; }
        .separador { margin: 1.5rem 0; border-top: 1px solid #ccc; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Iniciar sesión</h2>
        <form method="post">
            <input type="hidden" name="accion" value="login">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="password" name="clave" placeholder="Contraseña" required>
            <button type="submit">Entrar</button>
        </form>

        <div class="separador"></div>

        <h2>Registrarse</h2>
        <form method="post">
            <input type="hidden" name="accion" value="registrar">
            <input type="text" name="usuario" placeholder="Nuevo usuario" required>
            <input type="password" name="clave" placeholder="Nueva contraseña" required>
            <button type="submit">Registrarme</button>
        </form>

        <?php if ($mensaje): ?>
            <div class="mensaje"><?php echo $mensaje; ?></div>
        <?php endif; ?>
    </div>
</body>
</html>
