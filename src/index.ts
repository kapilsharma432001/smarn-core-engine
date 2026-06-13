import { searchMemories } from "./services/searchService";
import { getPaginationOffset, paginate } from "./utils/pagination";

const searchResult = searchMemories({
  view: "all",
  sort: {
    sortBy: "createdAt",
    sortDirection: "desc"
  }
});

if (!searchResult.success){
  console.log(searchResult.error.message);
}else{
  const paginatedResult = paginate(searchResult.data, { page: 1, pageSize: 10000 });

  console.log("Paginated Result: ");
  console.log({
    page: paginatedResult.page,
    pageSize: paginatedResult.pageSize,
    totalItems: paginatedResult.totalItems,
    totalPages: paginatedResult.totalPages,
    hasNextPage: paginatedResult.hasNextPage,
    hasPreviousPage: paginatedResult.hasPreviousPage
  });

  console.log("Data:");
  for (const memory of paginatedResult.data){
    console.log(`- ${memory.title}`);
  }
}

console.log(getPaginationOffset({ page: 3, pageSize: 20 }));
