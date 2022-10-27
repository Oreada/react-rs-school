import { getData } from '../api/getData';
import { IArtWorkData } from '../pages/HomePage/HomePage';

export const screensaver = (await getData()) as Array<IArtWorkData>;
