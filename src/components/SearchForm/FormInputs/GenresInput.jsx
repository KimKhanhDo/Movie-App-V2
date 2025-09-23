import clsx from "clsx";
import { useWatch } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";

function GenresInput({ control, onChange, value = [] }) {
    const mediaType = useWatch({ name: "mediaType", control });

    const { data } = useFetch(
        { url: `/genre/${mediaType}/list` },
        { enabled: mediaType },
    );

    useEffect(() => {
        onChange([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaType]);

    return (
        <div className="flex flex-wrap gap-1">
            {(data.genres || []).map((genre) => (
                <p
                    key={genre.id}
                    className={clsx(
                        "cursor-pointer rounded-lg border px-2 py-1",
                        {
                            "bg-black text-white": value.includes(genre.id),
                        },
                    )}
                    onClick={() => {
                        let newValue = [...value];

                        if (value.includes(genre.id)) {
                            newValue = newValue.filter((g) => g !== genre.id);
                        } else {
                            newValue = [...newValue, genre.id];
                        }

                        onChange(newValue);
                    }}
                >
                    {genre.name}
                </p>
            ))}
        </div>
    );
}
export default GenresInput;
