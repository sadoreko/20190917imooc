import request from "@utils/request";

/**
 * wongxiao 20200408 活动列表页
 * 格式来自api/public.js的getArticleList和src/views/shop/news/NewsList.vue
 * 接口用于src/views/sales/ActivityList.vue
 */
export function getSalesActivityList(q) {
  return request.post(
    "http://result.eolinker.com/cULrEyId01e638ea6ea326a0c6f86f41e3246f28021727a?uri=/sales/activity/list",
    q,
    { login: false }
  );
}
