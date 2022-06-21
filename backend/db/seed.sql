INSERT INTO roles (id, name) VALUES
    (1, "admin"),
    (2, "client");

INSERT INTO `categorias` (`id`, `name`) VALUES

(1, 'Info'),
(2, 'Juegos'),
(3, 'Juegos On-Line'),
(4, 'Links'),
(5, 'Linux'),
(6, 'Mac'),
(7, 'Manga'),
(8, 'Mascotas'),
(9, 'Musica'),
(10, 'Noticias'),
(11, 'Off-Topic'),
(12, 'Paranormal'),
(13, 'Patrocinados'),
(14, 'Recetas y Cocina'),
(15, 'Reviews'),
(16, 'Salud y Bienestar'),
(17, 'Solidaridad'),
(18, 'Arte'),
(19, 'Turismo'),
(20, 'T.V. Películas y Series');

INSERT INTO `usuarios` (`id`, `username`, `password`, `email`, `address`, `role`) VALUES
(1, 'Neo', '$2b$10$7Kn8uLrSTkskDztVhTrSK.dB0mXlL.MWwtBDLW/e0JphKu9BzaJAe', 'Test@Mail.com', 'Lorem St. 540', 1),