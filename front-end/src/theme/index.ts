export const colors = {
  // Verde (identidade principal)
  green: '#1B5E20',
  greenDark: '#0E3D14',
  greenLight: '#2E7D32',
  greenSoft: '#E8F5E9',
  // Amarelo trigo (ação / destaque)
  wheat: '#F4B400',
  wheatDark: '#D99A00',
  wheatSoft: '#FFF8E1',
  // Neutros
  background: '#F7F8F6',
  surface: '#FFFFFF',
  text: '#1A1F1A',
  textMuted: '#6B7268',
  border: '#E4E7E2',
  // Status
  success: '#2E7D32',
  danger: '#D9534F',
  online: '#3CCF4E',
  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const font = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 34,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
};
