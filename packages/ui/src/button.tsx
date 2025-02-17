"use client";

interface ButtonProps {
  label:string
}

export const Button = (params:ButtonProps) => {
  return (
    <button className="w-full flex items-center justify-center gap-3 bg-[#533ED8] hover:bg-[#3d23e0] text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300 transform hover:scale-[1.02]">
    {params.label}
  </button>
  );
};
