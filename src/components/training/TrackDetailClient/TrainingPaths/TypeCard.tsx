import { useGetTypeSubTypes } from "@/query/admin/type-subs";
import { IType } from "@/types/admin/admin";
import { CheckCircle2, ChevronRight, GraduationCap, Award } from "lucide-react";

const TypeCard = ({
  type,
  index,
  onApply,
}: {
  type: IType;
  index: number;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
}) => {
  const { data: subTypesRes, isLoading: loadingSubTypes } = useGetTypeSubTypes({
    type_id: String(type.id),
  });
  const subTypes = subTypesRes?.data || [];

  const icons = [
    <GraduationCap key="cap" className="w-7 h-7" />,
    <Award key="award" className="w-7 h-7" />,
  ];
  const colors = ["text-[#00677D] bg-[#00677D]/10", "text-blue-600 bg-blue-50"];

  return (
    <div className="bg-white rounded-4xl p-8 sm:p-10 border border-gray-100 flex flex-col relative overflow-hidden">
      <div className="absolute -top-4 right-2 text-[5rem] font-black text-gray-200 pointer-events-none select-none">
        0{index + 1}
      </div>

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 ${
          colors[index % colors.length]
        }`}
      >
        {icons[index % icons.length]}
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#00284F] mb-4 capitalize font-manrope ">
          {type.title}
        </h3>
        <p className="text-gray-500 mb-8 leading-relaxed">{type.description}</p>

        <ul className="space-y-4 mb-10 flex-1">
          {loadingSubTypes
            ? [1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-5 h-5 bg-gray-100 rounded-full shrink-0" />
                  <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                </li>
              ))
            : subTypes.map((sub) => (
                <li key={sub.id} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00677D] shrink-0 mt-0.5" />
                  <span className="text-black font-medium">{sub.title}</span>
                </li>
              ))}
        </ul>

        <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-auto">
          <button className="text-[#00677D] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-lg">
            {index === 0 ? "View Syllabus" : "View Track Info"}
            <ChevronRight className="w-5 h-5" />
          </button>
          {type.price && parseInt(type.price) > 0 && (
            <span className="text-3xl font-semibold text-[#00284F]">
              £{parseInt(type.price)}
            </span>
          )}
          <button
            onClick={() => onApply("type", type.id)}
            className="bg-[#00677D] text-white px-8 py-2 rounded-2xl font-bold hover:bg-[#00677D]-600 transition-all shadow-lg shadow-[#00677D]/20 hover:shadow-[#00677D]/40 active:scale-95"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeCard;
