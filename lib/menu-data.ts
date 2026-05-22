export interface MenuItem {
  name: string
  desc: string
  price: string
  gradient: string
  iconBg: string
  iconType: "flame" | "star" | "sparkles" | "crown" | "zap" | "utensils"
  badge?: string
}

export const riceBox: MenuItem[] = [
  {
    name: "Mongolian Rice",
    desc: "Carne Mongoliana con Arroz Frito",
    price: "$8.000",
    gradient: "linear-gradient(135deg, #3D0F0F 0%, #1A0505 100%)",
    iconBg: "#5C1515",
    iconType: "flame",
  },
  {
    name: "Chicken Rice",
    desc: "Pollo a la Naranja con Arroz Frito",
    price: "$7.000",
    gradient: "linear-gradient(135deg, #3D2A08 0%, #1A0F00 100%)",
    iconBg: "#5C3A0A",
    iconType: "star",
  },
  {
    name: "Shrimp Rice",
    desc: "Camarones Salteados con Arroz Frito",
    price: "$8.000",
    gradient: "linear-gradient(135deg, #082235 0%, #041018 100%)",
    iconBg: "#0D3550",
    iconType: "sparkles",
  },
  {
    name: "Seitán Rice",
    desc: "Seitán Agridulce Mongolian con Arroz Frito",
    price: "$7.300",
    gradient: "linear-gradient(135deg, #0D2A10 0%, #051405 100%)",
    iconBg: "#133D17",
    iconType: "utensils",
  },
  {
    name: "Tofu Rice",
    desc: "Tofu y Brócoli Salteado con Arroz Frito",
    price: "$7.300",
    gradient: "linear-gradient(135deg, #083030 0%, #041818 100%)",
    iconBg: "#0D4848",
    iconType: "sparkles",
  },
  {
    name: "Mix Rice",
    desc: "2 Proteínas a Elección con Arroz Frito",
    price: "$11.500",
    gradient: "linear-gradient(135deg, #250D3D 0%, #100518 100%)",
    iconBg: "#3A1560",
    iconType: "crown",
    badge: "MÁS PEDIDO",
  },
  {
    name: "Mongolian Chips",
    desc: "Carne Mongoliana con Papas Fritas",
    price: "$7.500",
    gradient: "linear-gradient(135deg, #2A1A08 0%, #140D00 100%)",
    iconBg: "#45280A",
    iconType: "zap",
  },
  {
    name: "Seitán Chips",
    desc: "Seitán Agridulce Mongolian con Papas Fritas",
    price: "$6.500",
    gradient: "linear-gradient(135deg, #1A2A08 0%, #0D1400 100%)",
    iconBg: "#283D0A",
    iconType: "zap",
  },
]

export const chaumin: MenuItem[] = [
  {
    name: "Mongo Chaumin",
    desc: "Carne Mongoliana con Fideos Salteados",
    price: "$8.500",
    gradient: "linear-gradient(135deg, #2E0A28 0%, #140512 100%)",
    iconBg: "#4A1040",
    iconType: "flame",
  },
  {
    name: "Shrimp Chaumin",
    desc: "Camarones con Fideos Salteados",
    price: "$8.500",
    gradient: "linear-gradient(135deg, #082030 0%, #040E18 100%)",
    iconBg: "#0D3048",
    iconType: "sparkles",
  },
  {
    name: "Chicken Chaumin",
    desc: "Pollo a la Naranja con Fideos Salteados",
    price: "$7.500",
    gradient: "linear-gradient(135deg, #1C2A0A 0%, #0D1405 100%)",
    iconBg: "#2A3D0A",
    iconType: "star",
  },
  {
    name: "Tofu Chaumin",
    desc: "Tofu Agridulce con Fideos Salteados",
    price: "$7.500",
    gradient: "linear-gradient(135deg, #0A1E2A 0%, #050E14 100%)",
    iconBg: "#103050",
    iconType: "sparkles",
  },
]

export const allMenuItems = [...riceBox, ...chaumin]

export interface ExtraItem {
  name: string
  desc: string
  price: string
  gradient: string
  emoji: string
}

export const extras: ExtraItem[] = [
  {
    name: "Arrollados Primavera",
    desc: "5 unidades crujientes — el acompañamiento perfecto",
    price: "$3.500",
    gradient: "linear-gradient(135deg, #2A1A08 0%, #140D00 100%)",
    emoji: "🥟",
  },
  {
    name: "Empanadas Pollo Mandarín",
    desc: "5 unidades — pollo en salsa mandarín",
    price: "$4.500",
    gradient: "linear-gradient(135deg, #2A1508 0%, #140A00 100%)",
    emoji: "🫔",
  },
  {
    name: "Papas Fritas",
    desc: "Porción generosa, doradas y crujientes",
    price: "$4.000",
    gradient: "linear-gradient(135deg, #2A2008 0%, #141000 100%)",
    emoji: "🍟",
  },
]
