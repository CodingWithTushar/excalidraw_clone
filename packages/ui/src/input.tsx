interface InputProps {
    label: string,
    type: string,
    placeholder: string
}

export function Input(params: InputProps) {
    return <div className="space-y-1">
    <label className="text-gray-700 font-medium">{params.label}</label>
    <input
      type={params.type}
      placeholder={params.placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#533ED8] focus:ring-2 focus:ring-[#533ED8]/20 transition-all outline-none"
    />
  </div>
}