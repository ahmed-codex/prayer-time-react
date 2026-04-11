import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IoChevronDown, IoCheckmarkSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Time from "../components/Time";

const egyptGovernorates = [
  { name: "القاهرة", city: "Cairo" },
  { name: "الجيزة", city: "Giza" },
  { name: "الإسكندرية", city: "Alexandria" },
  { name: "الدقهلية", city: "Mansoura" },
  { name: "البحر الأحمر", city: "Hurghada" },
  { name: "البحيرة", city: "Damanhur" },
  { name: "الفيوم", city: "Fayoum" },
  { name: "الغربية", city: "Tanta" },
  { name: "الإسماعيلية", city: "Ismailia" },
  { name: "المنوفية", city: "Shibin El Kom" },
  { name: "المنيا", city: "Minya" },
  { name: "القليوبية", city: "Banha" },
  { name: "الوادي الجديد", city: "Kharga" },
  { name: "السويس", city: "Suez" },
  { name: "أسوان", city: "Aswan" },
  { name: "أسيوط", city: "Assiut" },
  { name: "بني سويف", city: "Beni Suef" },
  { name: "بورسعيد", city: "Port Said" },
  { name: "دمياط", city: "Damietta" },
  { name: "الشرقية", city: "Zagazig" },
  { name: "جنوب سيناء", city: "El Tor" },
  { name: "كفر الشيخ", city: "Kafr El Sheikh" },
  { name: "مطروح", city: "Marsa Matruh" },
  { name: "الأقصر", city: "Luxor" },
  { name: "قنا", city: "Qena" },
  { name: "سوهاج", city: "Sohag" },
  { name: "شمال سيناء", city: "Arish" },
];
const prayerMap = {
  الفجر: "Fajr",
  الشروق: "Sunrise",
  الظهر: "Dhuhr",
  العصر: "Asr",
  المغرب: "Maghrib",
  العشاء: "Isha",
};

const Main = () => {
  const [cities, setCity] = useState(egyptGovernorates[0]);
  const [date, setDate] = useState("");
  const [prayerTime, setPrayerTime] = useState({});

  const formatTime = (time) => {
    if (!time) return;

    const [hour, minute] = time.split(":");

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString("ar-Us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const prayerFetch = async () => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${cities.city}&country=Egypt&method=5`,
        );
        const data = await res.json();
        setPrayerTime(data.data.timings);
        setDate(data.data.date.gregorian.date);
      } catch (error) {
        console.error("fetch Error");
      }
    };
    prayerFetch();
  }, [cities]);

  return (
    <div className="bg-[url('/cairo.jpg')] bg-cover bg-center min-h-screen w-full flex items-center justify-center md:justify-start p-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl backdrop-blur-sm bg-black/20 text-white rounded-xl border border-white/20 p-4 md:p-6 md:mr-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-around border-b border-gray-300 mb-4 pb-4 gap-4">
          {/* المدينة */}
          <div className="w-full md:w-auto">
            <h2 className="font-bold tracking-wide text-lg md:text-xl mb-2">
              المدينة
            </h2>

            <div className="relative bg-[#e2ac93]/75 rounded-lg w-full md:w-45">
              <Listbox value={cities} onChange={setCity}>
                <ListboxButton className="relative flex items-center w-full cursor-pointer bg-white/5 py-2 pr-8 pl-3 text-sm md:text-md rounded-lg outline-none focus:outline-none">
                  <IoChevronDown className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 fill-white/60" />
                  {cities.name}
                </ListboxButton>

                <ListboxOptions
                  dir="ltr"
                  className="absolute top-full mt-2 w-full bg-[#e2ac93] text-white rounded-xl max-h-60 overflow-y-auto p-2 shadow-lg z-50 outline-none focus:outline-none "
                >
                  {egyptGovernorates.map((govern) => (
                    <ListboxOption
                      key={govern.name}
                      value={govern}
                      className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm md:text-base mb-1 transition-all duration-300 border-b border-gray-500 data-focus:bg-[#f0a683]"
                    >
                      <IoCheckmarkSharp className="invisible size-4 text-white group-data-selected:visible" />
                      {govern.name}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>

          {/* التاريخ */}
          <div className="w-full md:w-auto text-center md:text-right">
            <h2 className="font-bold tracking-wide text-lg md:text-xl mb-2">
              التاريخ
            </h2>
            <h2 className="text-sm md:text-lg tracking-wide bg-[#e2ac93]/75 px-4 py-2 rounded-lg inline-block">
              {date}
            </h2>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-3 md:space-y-4">
          {["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"].map(
            (prayer) => (
              <Time
                key={prayer}
                time={formatTime(prayerTime[prayerMap[prayer]])}
                name={prayer}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
