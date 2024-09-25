import { pink, pinkDark } from "@/utils/colors";
import { eq, throttle } from "lodash";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { ComponentProps, useEffect, useState, memo, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Pressable, PanResponder, GestureResponderEvent, PanResponderGestureState, FlatList, VirtualizedList, NativeSyntheticEvent, NativeScrollEvent, ViewToken } from 'react-native';

interface DayItem {
    key: string;
    day: number;
    isCurrentMonth: boolean;
    date: Date;
}

interface MonthItem {
    key: string;
    year: number;
    month: number;
    monthName: string;
    days: Array<DayItem>;
}

interface MonthViewItem {
    key: string;
    year: number;
    month: number;
    monthName: string;
};

interface YearItem {
    key: string;
    year: number;
    months: Array<MonthViewItem>
}

interface CalendarDayItemProps {
    item: DayItem;
    currentDate: Date;
    onCurrentDateChange: (date: Date) => void;
};

interface CalendarMonthItemProps {
    item: MonthItem;
    currentDate: Date;
    onCurrentDateChange: (date: Date) => void;
};

interface CalendarMonthViewItemProps {
    item: MonthViewItem;
    currentDate: Date;
    onCurrentDateChange: (date: Date) => void;
};

interface CalendarYearItemProps {
    item: YearItem;
    currentDate: Date;
    onCurrentDateChange: (date: Date) => void;
};

interface CalendarHeaderProps {
    month: MonthItem;
    year: YearItem;
    calendarYearVisible: boolean;
    setCalendarYearVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

interface CalendarMonthFlatlistProps {
    setCurrentMonth: React.Dispatch<React.SetStateAction<MonthItem | undefined>>;
    months: MonthItem[];
    setMonths: React.Dispatch<React.SetStateAction<MonthItem[]>>;
    currentDate: Date;
    onCurrentDateChange: (date: Date) => void;
};

interface CalendarYearFlatlistProps {
    setCurrentYear: React.Dispatch<React.SetStateAction<YearItem | undefined>>;
    years: YearItem[];
    setYears: React.Dispatch<React.SetStateAction<YearItem[]>>;
    currentDate: Date;
    onCurrentDateChange: (date: Date) => void;
};

interface CalendarProps {
    currentDate: Date;
    onCurrentDateChange: (date: Date) => void;
    open: (visible: boolean) => void;
};

const WIDTH = 280;

const CalendarDayItem = memo(({ item, currentDate, onCurrentDateChange }: CalendarDayItemProps) => {
    const areDatesEqual = () => {
        return (
            item.date.getFullYear() === currentDate.getFullYear() &&
            item.date.getMonth() === currentDate.getMonth() &&
            item.date.getDate() === currentDate.getDate()
        );
    };

    return (
        <Pressable
            style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center"
            }}

            onPress={() => onCurrentDateChange(item.date)}
        >
            <View
                style={{
                    width: 32,
                    height: 32,
                    backgroundColor: areDatesEqual() ? pink.pink7 : "transparent",
                    borderRadius: areDatesEqual() ? 32 : 0,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        textAlignVertical: "center",
                        opacity: item.isCurrentMonth ? 1.0 : 0.3,
                        fontWeight: areDatesEqual() ? "800" : "400",
                        color: areDatesEqual() ? pinkDark.pink7 : pinkDark.pink3
                    }}
                >
                    {item.day}
                </Text>
            </View>
        </Pressable>
    );
});

const CalendarMonthItem = memo(({ item, currentDate, onCurrentDateChange }: CalendarMonthItemProps) => {
    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return (
        <View
            style={{
                width: WIDTH,
                height: WIDTH,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-around",
                    height: 40,
                    width: WIDTH
                }}
            >
                {weekDays.map((weekDay, index) => (
                    <Text
                        key={index}
                        style={{
                            width: "14.2%",
                            fontWeight: '600',
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: pinkDark.pink7
                        }}
                    >
                        {weekDay}
                    </Text>
                ))}
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: "space-around",
                    backgroundColor: pink.pink4,
                }}
            >
                {
                    item.days.map((day: DayItem) => (
                        <CalendarDayItem key={day.key} item={day} currentDate={currentDate} onCurrentDateChange={onCurrentDateChange} />
                    ))
                }
            </View>
        </View>
    );
});

const CalendarMonthViewItem = memo(({ item, currentDate, onCurrentDateChange }: CalendarMonthViewItemProps) => {
    const areDatesEqual = () => {
        return (
            item.year === currentDate.getFullYear() &&
            item.month === currentDate.getMonth()
        );
    };

    const onPress = () => {
        const currentDay = currentDate.getDate();
        const daysInSelectedMonth = new Date(item.year, item.month + 1, 0).getDate();
        const newDay = Math.min(currentDay, daysInSelectedMonth);
        const newDate = new Date(item.year, item.month, newDay);
        onCurrentDateChange(newDate);
    };

    return (
        <Pressable
            style={{
                width: 70,
                height: 90,
                alignItems: "center",
                justifyContent: "center"
            }}

            onPress={onPress}
        >
            <View
                style={{
                    width: 60,
                    height: 50,
                    backgroundColor: areDatesEqual() ? pink.pink7 : "transparent",
                    borderRadius: areDatesEqual() ? 16 : 0,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        textAlignVertical: "center",
                        fontWeight: areDatesEqual() ? "800" : "400",
                        color: areDatesEqual() ? pinkDark.pink7 : pinkDark.pink3
                    }}
                >
                    {item.monthName}
                </Text>
            </View>
        </Pressable>
    );
});

const CalendarYearItem = memo(({ item, currentDate, onCurrentDateChange }: CalendarYearItemProps) => {

    return (
        <View
            style={{
                width: WIDTH,
                height: WIDTH,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: "space-around",
                    backgroundColor: pink.pink4,
                }}
            >
                {
                    item.months.map((month: MonthViewItem) => (
                        <CalendarMonthViewItem key={month.key} item={month} currentDate={currentDate} onCurrentDateChange={onCurrentDateChange} />
                    ))
                }
            </View>
        </View>
    );
});

const CalendarHeader = ({ month, year, calendarYearVisible, setCalendarYearVisible }: CalendarHeaderProps) => {
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: pink.pink5,
                borderBottomWidth: 1,
                borderBottomColor: pink.pink6,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                height: 50
            }}

            onPress={() => setCalendarYearVisible(!calendarYearVisible)}
        >
            {
                month ?
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "700",
                            color: pinkDark.pink7
                        }}
                    >
                        {calendarYearVisible ?
                            year.year
                            :
                            month.monthName.charAt(0).toUpperCase() + month.monthName.slice(1) + ` ${month.year}`}
                    </Text>
                    :
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: pink.pink6,
                                borderRadius: 16,
                                width: 120,
                                height: 24
                            }}
                        />

                        <View
                            style={{
                                backgroundColor: pink.pink6,
                                borderRadius: 16,
                                width: 70,
                                height: 24
                            }}
                        />
                    </View>
            }
        </Pressable>
    );
};

const CalendarMonthFlatlist = ({ setCurrentMonth, months, setMonths, currentDate, onCurrentDateChange }: CalendarMonthFlatlistProps) => {
    const fetchMonthsBefore = async (origin: MonthItem, range: number): Promise<MonthItem[]> => {
        return new Promise((resolve) => {
            const newMonths = generateMonthsBefore(origin, range);
            resolve(newMonths);
        });
    };

    const fetchMonthsAfter = async (origin: MonthItem, range: number): Promise<MonthItem[]> => {
        return new Promise((resolve) => {
            const newMonths = generateMonthsAfter(origin, range);
            resolve(newMonths);
        });
    };

    const loadMoreMonths = throttle(async (direction: 'past' | 'future') => {
        if (direction === 'past') {
            const firstMonth = months[0];
            const newMonths = await fetchMonthsBefore(firstMonth, 12);
            setMonths((prevMonths) => [...newMonths, ...prevMonths]);
        } else {
            const lastMonth = months[months.length - 1];
            const newMonths = await fetchMonthsAfter(lastMonth, 12);
            setMonths((prevMonths) => [...prevMonths, ...newMonths]);
        }
    }, 200);

    const onEndReached = () => {
        loadMoreMonths('future');
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event.nativeEvent;
        if (contentOffset && contentOffset.x <= 0) {
            loadMoreMonths('past');
        }
    };

    const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken<MonthItem>[] }) => {
        if (!viewableItems.length)
            return;
        setCurrentMonth(viewableItems[0].item);
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const getItemLayout = (data: ArrayLike<MonthItem> | null | undefined, index: number) => {
        return ({
            length: WIDTH,
            offset: WIDTH * index,
            index,
        });
    };

    const renderItem = useCallback(({ item }: { item: MonthItem }) => {
        return <CalendarMonthItem item={item} currentDate={currentDate} onCurrentDateChange={onCurrentDateChange} />;
    }, []);

    return (
        <FlatList
            style={{
                width: WIDTH,
                height: WIDTH,
            }}
            pagingEnabled
            horizontal
            initialScrollIndex={6}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            data={months}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
            }}
            onScroll={handleScroll}
            keyExtractor={(item) => `${item.year}-${item.month}`}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
        />
    );
};

const CalendarYearFlatList = ({ setCurrentYear, years, setYears, currentDate, onCurrentDateChange }: CalendarYearFlatlistProps) => {

    const fetchMonthsBefore = async (origin: YearItem, range: number): Promise<YearItem[]> => {
        return new Promise((resolve) => {
            const newYears = generateYearsBefore(origin, range);
            resolve(newYears);
        });
    };

    const fetchMonthsAfter = async (origin: YearItem, range: number): Promise<YearItem[]> => {
        return new Promise((resolve) => {
            const newYears = generateYearsAfter(origin, range);
            resolve(newYears);
        });
    };

    const renderItem = useCallback(({ item }: { item: YearItem }) => {
        return <CalendarYearItem item={item} currentDate={currentDate} onCurrentDateChange={onCurrentDateChange} />;
    }, []);

    const loadMoreMonths = throttle(async (direction: 'past' | 'future') => {
        if (direction === 'past') {
            const firstYear = years[0];
            const newYears = await fetchMonthsBefore(firstYear, 12);
            setYears((prevYears) => [...newYears, ...prevYears]);
        } else {
            const lastYear = years[years.length - 1];
            const newYears = await fetchMonthsAfter(lastYear, 12);
            setYears((prevYears) => [...prevYears, ...newYears]);
        }
    }, 200);

    const onEndReached = () => {
        loadMoreMonths('future');
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event.nativeEvent;
        if (contentOffset && contentOffset.x <= 0) {
            loadMoreMonths('past');
        }
    };
    const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken<YearItem>[] }) => {
        if (!viewableItems.length)
            return;
        setCurrentYear(viewableItems[0].item);
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const getItemLayout = (data: ArrayLike<YearItem> | null | undefined, index: number) => {
        return ({
            length: WIDTH,
            offset: WIDTH * index,
            index,
        });
    };

    return (
        <FlatList
            style={{
                width: WIDTH,
                height: WIDTH,
            }}
            pagingEnabled
            horizontal
            initialScrollIndex={6}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            data={years}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
            }}
            onScroll={handleScroll}
            keyExtractor={(item) => `${item.year}`}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
        />
    );
};

export const Calendar = ({ currentDate, onCurrentDateChange, open }: CalendarProps) => {
    const [months, setMonths] = useState<MonthItem[]>(generateMonthsAround(currentDate, 6));
    const [years, setYears] = useState<YearItem[]>(generateYearsAround(currentDate, 6));
    const [currentMonth, setCurrentMonth] = useState<MonthItem>();
    const [currentYear, setCurrentYear] = useState<YearItem>();
    const [calendarYearVisible, setCalendarYearVisible] = useState<boolean>(false);

    const updateDate = (newDate: Date) => {
        onCurrentDateChange(newDate);
        open(false);
    };

    const refreshDate = (newDate: Date) => {
        onCurrentDateChange(newDate);
        setMonths(generateMonthsAround(newDate, 6));
        setYears(generateYearsAround(newDate, 6))
        setCurrentMonth(undefined);
        setCalendarYearVisible(false);
    };

    return (
        <View
            style={{
                backgroundColor: pink.pink4,
                borderRadius: 16,
                width: WIDTH,
                paddingBottom: 20
            }}
        >
            <CalendarHeader month={currentMonth ?? months[6]} year={currentYear ?? years[6]} calendarYearVisible={calendarYearVisible} setCalendarYearVisible={setCalendarYearVisible} />

            {
                calendarYearVisible ?
                    <CalendarYearFlatList
                        setCurrentYear={setCurrentYear}
                        years={years}
                        setYears={setYears}
                        currentDate={currentDate}
                        onCurrentDateChange={refreshDate}
                    />
                    :
                    <CalendarMonthFlatlist
                        setCurrentMonth={setCurrentMonth}
                        months={months}
                        setMonths={setMonths}
                        currentDate={currentDate}
                        onCurrentDateChange={updateDate}
                    />
            }

        </View >
    );
};

const generateCalendarDays = (year: number, month: number): DayItem[] => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    // Adjusted startWeekDay calculation to make Monday = 0
    const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7; // 0 (Monday) to 6 (Sunday)

    const calendarDays: DayItem[] = [];

    // Previous month's days (if the month doesn't start on Monday)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startWeekDay - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        calendarDays.push({
            key: `prev-${day}`,
            day: day,
            isCurrentMonth: false,
            date: new Date(year, month - 1, day),
        });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            key: `curr-${i}`,
            day: i,
            isCurrentMonth: true,
            date: new Date(year, month, i),
        });
    }

    // Next month's days (to fill the last week)
    const totalCells = Math.ceil(calendarDays.length / 7) * 7;
    const nextMonthDayCount = totalCells - calendarDays.length;
    for (let i = 1; i <= nextMonthDayCount; i++) {
        calendarDays.push({
            key: `next-${i}`,
            day: i,
            isCurrentMonth: false,
            date: new Date(year, month + 1, i),
        });
    }

    return calendarDays;
};

const generateYearsAround = (centerDate: Date, range: number): YearItem[] => {
    const yearsArray: YearItem[] = [];

    const centerYear = centerDate.getFullYear();

    const months = ["Janv", "Févr", "Mars", "Avril", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

    for (let i = -range; i <= range; i++) {
        const date = new Date(centerYear + i, 0, 1);
        const year = date.getFullYear();
        yearsArray.push({
            key: `${year}`,
            year: year,
            months: months.map((monthName, index) => ({
                key: `month-${year}-${index}`,
                year: year,
                month: index,
                monthName: monthName
            }))
        });
    }

    return yearsArray;
}


const generateYearsBefore = (origin: YearItem, range: number): YearItem[] => {
    const yearsArray: YearItem[] = [];
    const months = ["Janv", "Févr", "Mars", "Avril", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
    for (let i = range; i >= 1; i--) {
        const date = new Date(origin.year - i, 0, 1);
        const year = date.getFullYear();
        yearsArray.push({
            key: `${year}`,
            year: year,
            months: months.map((monthName, index) => ({
                key: `month-${year}-${index}`,
                year: year,
                month: index,
                monthName: monthName
            }))
        });
    }
    return yearsArray;
}

const generateYearsAfter = (origin: YearItem, range: number): YearItem[] => {
    const yearsArray: YearItem[] = [];
    const months = ["Janv", "Févr", "Mars", "Avril", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
    for (let i = 1; i <= range; i++) {
        const date = new Date(origin.year + i, 0, 1);
        const year = date.getFullYear();
        yearsArray.push({
            key: `${year}`,
            year: year,
            months: months.map((monthName, index) => ({
                key: `month-${year}-${index}`,
                year: year,
                month: index,
                monthName: monthName
            }))
        });
    }
    return yearsArray;
}

const generateMonthsAround = (centerDate: Date, range: number): MonthItem[] => {
    const monthsArray: MonthItem[] = [];
    const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });
    const centerMonth = centerDate.getMonth();
    const centerYear = centerDate.getFullYear();

    for (let i = -range; i <= range; i++) {
        const date = new Date(centerYear, centerMonth + i, 1);
        const monthName = monthFormatter.format(date);
        const month = date.getMonth();
        const year = date.getFullYear();
        monthsArray.push({
            key: `${year}-${month}`,
            month: month,
            year: year,
            monthName: monthName,
            days: generateCalendarDays(year, month),
        });
    }

    return monthsArray;
};

const generateMonthsBefore = (origin: MonthItem, range: number): MonthItem[] => {
    const monthsArray: MonthItem[] = [];
    const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });
    for (let i = range; i >= 1; i--) {
        const date = new Date(origin.year, origin.month - i, 1);
        const monthName = monthFormatter.format(date);
        const month = date.getMonth();
        const year = date.getFullYear();
        monthsArray.push({
            key: `${year}-${month}`,
            month: month,
            year: year,
            monthName: monthName,
            days: generateCalendarDays(year, month),
        });
    }
    return monthsArray;
}

const generateMonthsAfter = (origin: MonthItem, range: number): MonthItem[] => {
    const monthsArray: MonthItem[] = [];
    const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });
    for (let i = 1; i <= range; i++) {
        const date = new Date(origin.year, origin.month + i, 1);
        const monthName = monthFormatter.format(date);
        const month = date.getMonth();
        const year = date.getFullYear();
        monthsArray.push({
            key: `${year}-${month}`,
            month: month,
            year: year,
            monthName: monthName,
            days: generateCalendarDays(year, month),
        });
    }
    return monthsArray;
}