export default class GetDate {
    async getToday(): Promise<string> {
        const today: string = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return today;
    }
}