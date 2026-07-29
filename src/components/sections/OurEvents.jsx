"use client";

const bentoItems = [
    {
        img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782388099/WhatsApp_Image_2026-06-19_at_10.00.35_zinobj.jpg",
        label: "Keynote Address",
        span: "col-span-2 row-span-2",
    },
    {
        img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782388562/WhatsApp_Image_2026-06-25_at_16.50.50_edtv6d.jpg",
        label: "Leadership Panel",
        span: "col-span-2 row-span-1",
    },
    {
        img: "/images/event-middle.jpg",
        label: "Interactive Session",
        span: "col-span-1 row-span-1",
    },
    {
        img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782389297/WhatsApp_Image_2026-06-19_at_10.00.39_jyu73y_ju37t1_rxygh3.jpg",
        label: "Team Workshop",
        span: "col-span-1 row-span-1",
    },
    {
        img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782388098/WhatsApp_Image_2026-06-19_at_10.00.34_krkndr.jpg",
        label: "Group Photo",
        span: "col-span-2 row-span-2",
    },
    {
        img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782388562/WhatsApp_Image_2026-06-25_at_16.50.50_1_llsi1e.jpg",
        label: "Networking",
        span: "col-span-1 row-span-1 md:row-span-2",
    },
    {
        img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782388097/WhatsApp_Image_2026-06-19_at_10.00.35_1_a3ahii.jpg",
        label: "Live Transformation",
        span: "col-span-1 row-span-1 md:row-span-2",
    },
];

export default function EventRecapSection() {
    return (
        <section className=" py-16 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between mb-10 gap-6">

                    {/* Left: heading block */}
                    <div className="max-w-2xl">
                        <p className="uppercase tracking-wide text-[#0a9396] font-semibold text-sm mb-2">
                            Session Highlights
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            Moments From Our Training
                            <br className="hidden md:block" />
                            <span
                                className="inline-block -rotate-1 text-[#0a9396]"
                                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}
                            >
                                Sessions
                            </span>
                            {" & "}
                            <span
                                className="inline-block rotate-1 text-[#0a9396]"
                                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}
                            >
                                Workshops
                            </span>
                        </h2>

                        <p className="mt-4 text-gray-600 text-lg">
                            A glimpse into our interactive sessions, hands-on workshops, and impactful learning experiences.
                        </p>
                    </div>

                    {/* Right: stats + CTA, pinned top-right */}
                    <div className="flex flex-col items-start md:items-end gap-5 md:pt-1">
                        <div className="flex items-center gap-8">
                            <div className="text-center md:text-right">
                                <div className="text-2xl font-bold text-[#0a9396]">50+</div>
                                <div className="text-xs uppercase text-gray-500 tracking-wide whitespace-nowrap">Workshops Conducted</div>
                            </div>
                            <div className="text-center md:text-right">
                                <div className="text-2xl font-bold text-[#0a9396]">200+</div>
                                <div className="text-xs uppercase text-gray-500 tracking-wide whitespace-nowrap">Hours of Training</div>
                            </div>
                        </div>
                        <button className="bg-[#0a9396] hover:bg-[#0a9396] text-white text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-full transition-colors duration-300 whitespace-nowrap">
                            View Full Gallery
                        </button>
                    </div>
                </div>

                {/* Bento Grid — compact */}
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[135px] md:auto-rows-[170px] gap-4">
                    {bentoItems.map((item, i) => (
                        <div
                            key={i}
                            className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 ${item.span}`}
                        >
                            <img
                                src={item.img}
                                alt={item.label}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">
                                    {item.label}
                                </p>
                            </div>

                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-white/30 transition-all duration-500" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}