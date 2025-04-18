export const renderPaginationButtons = (
  totalPages: number,
  currentPage: number
) => {
  const buttons = [];
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push({
        label: i.toString(),
        page: i,
        isActive: i === currentPage,
        type: "number",
      });
    }
  } else {
    buttons.push({
      label: "1",
      page: 1,
      isActive: currentPage === 1,
      type: "number",
    });

    if (currentPage <= 2) {
      buttons.push({
        label: "2",
        page: 2,
        isActive: currentPage === 2,
        type: "number",
      });
      buttons.push({
        label: "...",
        type: "ellipsis",
      });
    } else if (currentPage === 3 && currentPage < totalPages - 1) {
      buttons.push({
        label: "...",
        type: "ellipsis",
      });
      buttons.push({
        label: currentPage.toString(),
        page: currentPage,
        isActive: true,
        type: "number",
      });
    } else if (currentPage > 3 && currentPage < totalPages - 1) {
      buttons.push({
        label: "...",
        type: "ellipsis",
      });
      buttons.push({
        label: currentPage.toString(),
        page: currentPage,
        isActive: true,
        type: "number",
      });

      buttons.push({
        label: (currentPage + 1).toString(),
        page: currentPage + 1,
        isActive: false,
        type: "number",
      });
    } else {
      buttons.push({
        label: "...",
        type: "ellipsis",
      });

      buttons.push({
        label: (totalPages - 1).toString(),
        page: totalPages - 1,
        isActive: currentPage === totalPages - 1,
        type: "number",
      });
    }
    buttons.push({
      label: totalPages.toString(),
      page: totalPages,
      isActive: currentPage === totalPages,
      type: "number",
    });
  }
  return buttons;
};
