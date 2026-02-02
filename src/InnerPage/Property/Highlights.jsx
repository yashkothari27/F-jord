import { LandPlot, House, Ruler } from "lucide-react";

const iconMap = {
  home: House,
  Rule: Ruler,
  land: LandPlot,
};

const Highlights = ({ data }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 my-2 text-base md:gap-6 text-slate-900 max-md:max-w-full">
      {data.map((feature, index) => {
        const IconComponent = iconMap[feature.icon] || House;
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-2 sm:my-1 duration-300 ease-in-out bg-white shadow-[0_0px_20px_rgb(256,256,256,0)] cursor-default rounded-2xl font-medium hover:shadow-[0_0px_30px_rgb(256,256,256,0.6)]"
          >
            <IconComponent className="object-contain w-4 aspect-square" />
            <div className="text-sm">{feature.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Highlights;
