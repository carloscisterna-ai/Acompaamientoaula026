# Acompaña 2026

Aplicación web responsiva para gestionar el acompañamiento docente del Colegio John F. Kennedy.

## Funciones incluidas

- Dashboard administrativo con cobertura, estado del proceso, logro y evolución.
- Agenda de acompañamientos y formulario de programación.
- Registro de observación con indicadores `Claro`, `Parcial` y `Ausente`.
- Etapa 2 de retroalimentación con propuesta editable asistida por IA.
- Listado y estado del equipo docente.
- Navegación interactiva y diseño adaptable a escritorio, tablet y móvil.

Los datos actuales son demostrativos y permiten recorrer toda la experiencia sin configurar servicios externos. Para producción, el siguiente paso es conectar autenticación, PostgreSQL y el proveedor de IA elegido.

## Ejecución local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Validación

```bash
npm run build
npm run start
```

## Estructura principal

- `src/app/page.tsx`: entrada de la aplicación.
- `src/components/platform.tsx`: vistas, formularios e interacciones.
- `src/components/icons.tsx`: iconografía SVG accesible.
- `src/app/globals.css`: sistema visual y adaptación responsiva.
