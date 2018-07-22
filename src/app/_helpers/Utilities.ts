export class Utilities {
    static addYearsToDate(dt: Date, years: number): Date {
        if (!dt) {
            return null;
        }
        const yy = dt.getFullYear();
        const mm = dt.getMonth();
        const dd = dt.getDate();

        if (years) {
            return new Date(yy + years, mm, dd);
        }
        return dt;
    }

    static dateDiffInDays(date1: Date, date2: Date): Number {
        let days = 0;
        const diff = date1.getTime() - date2.getTime();
        days = Math.ceil(diff / (1000 * 3600 * 24));
        return days;
    }
}
