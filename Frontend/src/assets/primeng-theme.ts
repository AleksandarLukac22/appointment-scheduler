import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

export const ThemePreset = definePreset(Aura, {
  semantic: {
    surface: {
      0: '#e5e7eb',
    },
    primary: {
      50: '{Blue.50}',
      100: '{Blue.100}',
      200: '{Blue.200}',
      300: '{Blue.300}',
      400: '{Blue.400}',
      500: '{Blue.500}',
      600: '{Blue.600}',
      700: '{Blue.700}',
      800: '{Blue.800}',
      900: '{Blue.900}',
      950: '{Blue.950}',
      color: '{Blue.600}',
      contrastColor: '{surface.0}',
      hoverColor: '{Blue.500}',
      activeColor: '{Blue.400}',
    },
  },
  components: {
    panel: {
      colorScheme: {
        dark: {
          root: {
            header: {
              background: '{surface.900}',
            },
            background: '{surface.800}',
          },
        },
      },
    },
  },
});
