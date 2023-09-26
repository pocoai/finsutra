import jsPDF from "jspdf";
import "jspdf-autotable";

const checkPageHeight = (pdf, blockY) => {
  const pageHeight = pdf.internal.pageSize.getHeight();

  if (blockY + 20 > pageHeight) {
    pdf.addPage();
  }
};

const addTextWithSpaceText = (pdf, x, y, firstText, secondText) => {
  pdf.setFontSize(10);

  const lineHeight = pdf.internal.getLineHeight() * 0.3527; // Convert line height to points

  const firstLines = pdf.splitTextToSize(firstText, pdf.internal.pageSize.width - x * 2);
  const secondLines = pdf.splitTextToSize(secondText, pdf.internal.pageSize.width - x * 2);

  const firstTotalHeight = firstLines.length * lineHeight;
  const secondTotalHeight = secondLines.length * lineHeight;

  const startY = y + firstTotalHeight + 10; // Add some padding between text and space

  pdf.text(x, y, firstLines); // Add the first text

  // Add a space
  pdf.text(x, startY, "");

  const spaceY = startY + lineHeight;

  pdf.text(x, spaceY, secondLines); // Add the second text

  checkPageHeight(pdf, spaceY + secondTotalHeight);
};

const addTextAndAutoTable = (pdf, x, y, text, tableData, options) => {
  pdf.setFontSize(10);

  const lineHeight = pdf.internal.getLineHeight() * 0.3527; // Convert line height to points

  const lines = pdf.splitTextToSize(text, pdf.internal.pageSize.width - x * 2);
  const totalHeight = lines.length * lineHeight;

  const startY = y + totalHeight + 10; // Add some padding between text and table

  pdf.text(x, y, lines); // Add the main text

  pdf.autoTable({
    ...options,
    startY: startY,
    startX: x,
    body: tableData,
  });

  checkPageHeight(pdf, startY + tableData.length * lineHeight);
};

const addTextArrayWithNewPage = (pdf, x, y, textArray, spacing = 5, lineSpacing = 2) => {
  const pageHeight = pdf.internal.pageSize.getHeight();
  const lineHeight = pdf.internal.getLineHeight() * 0.3527; // Convert line height to points

  let currentY = y; // Starting Y position

  for (let line of textArray) {
    const textLines = pdf.splitTextToSize(line, 160); // Split text into lines

    for (let textLine of textLines) {
      const textHeight = pdf.getTextDimensions(textLine).h;

      if (currentY + textHeight + spacing > pageHeight) {
        pdf.addPage();
        currentY = 10; // Start at the top of the new page
      }

      pdf.text(x, Number(currentY), textLine, {
        maxWidth: 160,
      });

      currentY += textHeight + lineSpacing;
    }

    currentY += spacing; // Increase spacing between elements
  }
};

const addTextWithNewPage = (pdf, x, y, text, spacing = 2) => {
  const pageHeight = pdf.internal.pageSize.getHeight();
  const lineHeight = pdf.internal.getLineHeight() * 0.3527; // Convert line height to points

  const textLines = pdf.splitTextToSize(text, 160); // Split text into lines

  let currentY = y; // Starting Y position

  for (let line of textLines) {
    const textHeight = pdf.getTextDimensions(line).h;
    if (currentY + textHeight + spacing > pageHeight) {
      pdf.addPage();
      currentY = 10; // Start at the top of the new page
    }

    pdf.text(x, Number(currentY), line, {
      maxWidth: 160,
    });

    currentY += textHeight + spacing;
  }
};

const addTextWithSpacing = (pdf, x, y, text, spacing = 2) => {
  pdf.text(x, y, text, {
    maxWidth: 160,
  });

  pdf.text(0, pdf.internal.pageSize.getHeight() - 10, ""); // Add an empty line

  checkPageHeight(pdf, y + spacing);
};

// const addWatermark = async (pdf, content) => {
//   const canvas = await html2canvas(content);
//   const imgData = canvas.toDataURL("image/png");

//   pdf.addImage(
//     imgData,
//     "PNG",
//     0,
//     0,
//     pdf.internal.pageSize.getWidth(),
//     pdf.internal.pageSize.getHeight()
//   );
// };

const addFooterImage = async (pdf) => {
  const img = new Image();

  img.src = "/images/logo.png";

  const imgWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (img.height * imgWidth) / img.width;

  for (let pageIndex = 0; pageIndex < pdf.internal.getNumberOfPages(); pageIndex++) {
    pdf.setPage(pageIndex + 1); // Set the current page

    // pdf.addImage(img.src, "PNG", xCoordinate, yCoordinate, imgWidth, imgHeight);
    pdf.addImage(img, "png", 150, 270, 50, 20);
  }
};

export const handlePdfDownload = (currentProject) => {
  const pdf = new jsPDF();

  if (
    currentProject?.idea_articulation?.selected &&
    currentProject?.idea_articulation?.data.length > 0
  ) {
    pdf.setFontSize(20);
    addTextWithSpacing(pdf, 20, 20, `Project: ${currentProject?.name}`);
    pdf.setFontSize(18);
    addTextWithSpacing(pdf, 20, 30, `Journey #1: Zero to coming soon`);
    addTextWithSpacing(pdf, 20, 40, `Idea Articulation:`);
    addTextAndAutoTable(
      pdf,
      20,
      50,
      "",
      currentProject?.idea_articulation?.data.map((item) => [item.key, item.value]),
      {
        theme: "striped",
        head: [["Title", "Description"]],
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      }
    );
  }

  if (
    currentProject?.idea_validation?.selected &&
    currentProject?.idea_validation?.data[0].value.length > 0
  ) {
    pdf.addPage();
    pdf.setFontSize(18);
    addTextWithSpacing(pdf, 20, 20, `Problem Solution Fit:`);
    addTextAndAutoTable(
      pdf,
      20,
      30,
      currentProject?.idea_validation?.data[0].key,
      currentProject?.idea_validation?.data[0].value.map((item) => [item.Problem, item.Solution]),
      {
        theme: "grid",
        head: [["Problem", "Solution"]],
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      }
    );
  }

  if (
    currentProject?.brand_kit?.selected &&
    typeof currentProject?.brand_kit?.data[0]?.value === "object"
  ) {
    pdf.addPage();
    pdf.setFontSize(18);
    addTextWithSpacing(pdf, 20, 20, `Brand Kit:`);
    let data = Object.entries(currentProject?.brand_kit?.data[0].value);
    addTextAndAutoTable(
      pdf,
      20,
      30,
      "",
      data.map((item) => [item[0], item[1]]),
      {
        theme: "striped",
        head: [["Title", "Description"]],
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      }
    );
  }
  if (
    currentProject?.product_development?.selected &&
    typeof currentProject?.product_development?.data[0]?.value === "object"
  ) {
    pdf.addPage();

    pdf.setFontSize(18);

    addTextWithSpacing(pdf, 20, 20, `Positioning and Messaging:`);

    pdf.setFontSize(10);

    addTextWithSpacing(pdf, 20, 30, "Positioning Statement:");

    addTextWithSpaceText(
      pdf,
      20,
      40,
      currentProject?.product_development?.data[0].value.Positioning,
      "USP's:"
    );

    addTextArrayWithNewPage(
      pdf,
      20,
      80,
      currentProject?.product_development?.data[0].value["USPs"]
    );

    pdf.addPage();

    addTextAndAutoTable(
      pdf,
      20,
      20,
      "Favcy Venture Builder Framework:",
      currentProject?.product_development?.data[0].value["Favcy_Venture_builder_framework"].map(
        (item) => [item.Benefit, item.Feature, item.Value_Proposition]
      ),
      {
        theme: "grid",
        head: [["Benefit", "Feature", "Value Proposition"]],
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      }
    );
  }
  if (
    currentProject?.product_launch?.selected &&
    currentProject?.product_launch?.data?.length > 0
  ) {
    pdf.addPage();

    pdf.setFontSize(18);

    addTextWithSpacing(pdf, 20, 20, "Coming Soon Page");

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 30, currentProject?.product_launch?.data[0].value);
  }

  if (currentProject?.mvp_page?.selected && currentProject?.mvp_page?.data[0].value) {
    pdf.addPage();

    pdf.setFontSize(18);

    addTextWithSpacing(pdf, 20, 20, currentProject?.mvp_page?.data[0].key);

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 40, currentProject?.mvp_page?.data[0].value);
  }

  if (currentProject?.journey1_tab7?.selected && currentProject?.journey1_tab7?.data[0].value) {
    pdf.addPage();

    pdf.setFontSize(18);

    addTextWithSpacing(pdf, 20, 20, "Monetizing Features");

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 30, currentProject?.journey1_tab7?.data[0].value);
  }

  if (currentProject?.journey1_tab8?.selected && currentProject?.journey1_tab8?.data[0].value) {
    pdf.addPage();

    pdf.setFontSize(18);
    addTextWithSpacing(pdf, 20, 20, "Research and Knowledge Bank");

    pdf.setFontSize(10);

    const tableData = currentProject?.journey1_tab8?.data[0].value?.competitors.map((item) => [
      { content: item.domain, link: item.url }, // Use 'content' instead of 'text'
      item.description,
    ]);

    addTextAndAutoTable(
      pdf,
      20,
      30,
      "Research and Knowledge Bank provides the best resources that we could curate for you. They include data banks, competitor showcasing, or just more information that we believe should be useful for you as a founder.",
      tableData,
      {
        theme: "grid",
        head: [["Domain", "Description"]],
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      }
    );
  }

  if (currentProject?.journey2_tab3?.selected && currentProject?.journey2_tab3?.data[0]?.value) {
    pdf.setFontSize(18);

    pdf.addPage();

    pdf.setFontSize(15);

    pdf.text(20, 20, `Journey #2: Pre-Product Hustle`);
    pdf.text(20, 30, `Aligning Resources and Manpower`);

    pdf.autoTable({
      theme: "grid",
      head: [["Pillar", "Inbound", "Outbound"]],
      body: [
        [
          "Reach Pillar",
          currentProject?.journey2_tab3?.data[0].value["reach_pillar"].inbound,
          currentProject?.journey2_tab3?.data[0].value["reach_pillar"].outbound,
        ],
        [
          "Nurture Pillar",
          currentProject?.journey2_tab3?.data[0].value["nurture_pillar"]?.inbound,
          currentProject?.journey2_tab3?.data[0].value["nurture_pillar"]?.outbound,
        ],
        [
          "Commitment Pillar",
          currentProject?.journey2_tab3?.data[0].value["commitment_pillar"]?.inbound,
          currentProject?.journey2_tab3?.data[0].value["commitment_pillar"]?.outbound,
        ],
        [
          "Customer Success Pillar",
          currentProject?.journey2_tab3?.data[0].value["customer_success_pillar"]?.inbound,
          currentProject?.journey2_tab3?.data[0].value["customer_success_pillar"]?.outbound,
        ],
        [
          "Product Pillar",
          currentProject?.journey2_tab3?.data[0].value["product_pillar"]?.inbound,
          currentProject?.journey2_tab3?.data[0].value["product_pillar"]?.outbound,
        ],
      ],
      startY: 40,
      styles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [255, 127, 80],
        cellWidth: 60,
      },
    });
  }

  if (currentProject?.journey2_tab4?.selected && currentProject?.journey2_tab4?.data[0]?.value) {
    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(20, 20, "Deep Dive : Reach Pillar", {
      maxWidth: 160,
    });

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 30, currentProject.journey2_tab4.data[0].value);
  }
  if (currentProject?.journey2_tab5?.data[0]?.value && currentProject?.journey2_tab5?.selected) {
    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(20, 20, "Deep Dive : Nurture Pillar", {
      maxWidth: 160,
    });

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 30, currentProject.journey2_tab5.data[0].value);
  }

  if (currentProject?.journey2_tab6?.selected && currentProject?.journey2_tab6?.data[0]?.value) {
    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(20, 20, "Deep Dive : Committment Pillar", {
      maxWidth: 160,
    });

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 30, currentProject.journey2_tab6.data[0].value);
  }

  if (currentProject?.journey2_tab7?.selected && currentProject?.journey2_tab7?.data[0]?.value) {
    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(20, 20, "Deep Dive : Customer Success Pillar", {
      maxWidth: 160,
    });

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 30, currentProject.journey2_tab7.data[0].value);
  }
  if (currentProject?.journey2_tab8?.selected && currentProject?.journey2_tab8?.data[0]?.value) {
    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(20, 20, "Enabling Tech Pre-Product", {
      maxWidth: 160,
    });

    pdf.setFontSize(10);

    addTextWithNewPage(pdf, 20, 30, currentProject?.journey2_tab8?.data[0].value);
  }

  // addWatermark();
  addFooterImage(pdf);

  let pdfContent = pdf.output("datauristring");

  return pdfContent;
};
