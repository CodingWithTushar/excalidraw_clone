import { ReactNode } from "react"

interface LineIconsProps { 
    icons: ReactNode,
    onClick: () => void,
    activated: boolean
}

export function IconsButtons(params : LineIconsProps) {
    return  <div
    className={`flex items-center text-black justify-center cursor-pointer rounded-md border p-6 ${
      params.activated 
        ? "bg-gray-500 text-white border-gray-600" 
        : "bg-white text-gray-500 border-gray-300"
    } hover:bg-gray-400 transition-colors`}
    onClick={params.onClick}
  >
  </div>
} 