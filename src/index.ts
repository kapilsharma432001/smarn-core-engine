import { getMemoryAnalytics } from './services/analyticsService';
import { getTopCategories } from './services/analyticsService';

const analyticsResult = getMemoryAnalytics();

if (!analyticsResult.success) {
  console.log("Analytics error: ", analyticsResult.error.message);
} else {
  const analytics = analyticsResult.data;
  console.log("Memory Analytics: ", analytics);
}

const getTopCategoriesResult = getTopCategories(5);

if (!getTopCategoriesResult.success) {
  console.log("Top categories error: ", getTopCategoriesResult.error.message);
} else {
  const topCategories = getTopCategoriesResult.data;
  console.log("Top Categories: ", topCategories);
}