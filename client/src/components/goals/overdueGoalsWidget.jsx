import { useState, useEffect, useMemo } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import GoalCard from "./goalCard";


function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

function OverdueGoalsWidget({ goals, onDelete, onComplete, onGoalUpdated }) {
    const pages = useMemo(() => chunkArray(goals, 2), [goals]);

    const [api, setApi] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0)


    useEffect(() => {
        if (!api) return;

        const update = () => {
            setActiveIndex(api.selectedScrollSnap());
        };

        update();               // initial
        api.on("select", update);

        return () => {
            api.off("select", update);
        };
    }, [api]);

    return (
        <Card className="bg-slate-900 border-border self-start">
            <CardHeader>
                <CardTitle className="text-lg">
                    Overdue Goals
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col justify-between">
                {goals.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Nothing Overdue 🎉
                    </p>
                ) : goals.length <= 2 ? (
                    <div className="space-y-3">
                        {goals.map(goal => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                variant="overdue"
                                onDelete={onDelete}
                                onComplete={onComplete}
                                onGoalUpdated={onGoalUpdated}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <Carousel setApi={setApi} className="w-full">
                            <CarouselContent>
                                {pages.map((pageGoals, pageIndex) => (
                                    <CarouselItem key={pageIndex}>
                                        <div className="space-y-3">
                                            {pageGoals.map((goal) => (
                                                <GoalCard
                                                    key={goal.id}
                                                    goal={goal}
                                                    variant="overdue"
                                                    onDelete={onDelete}
                                                    onComplete={onComplete}
                                                    onGoalUpdated={onGoalUpdated}
                                                />
                                            ))}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* Carousel Controls */}
                            <div className="flex items-center justify-center gap-4 mt-6">
                                {/* Left arrow slot */}
                                <div className="w-8 flex justify-center">
                                    {activeIndex > 0 && (
                                        <CarouselPrevious className="static text-white border-white/30 hover:bg-white/10" />
                                    )}
                                </div>

                                {/* Pagination dots (always centered) */}
                                <div className="flex gap-2">
                                    {pages.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === activeIndex
                                                    ? "bg-indigo-400 scale-110"
                                                    : "bg-slate-600"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Right arrow slot */}
                                <div className="w-8 flex justify-center">
                                    {activeIndex < pages.length - 1 && (
                                        <CarouselNext className="static text-white border-white/30 hover:bg-white/10" />
                                    )}
                                </div>
                            </div>
                        </Carousel>
                    </>
                )}
            </CardContent>
        </Card >
    );
}

export default OverdueGoalsWidget;