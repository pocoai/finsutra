/*jshint sub:true*/

import JsPDF from "jspdf";

import "jspdf-autotable";

export const noop = () => {};

export const deepCopy = (data) => JSON.parse(JSON.parse(data));

export const createPDF = (currentProject) => {
  return new Promise((resolve, reject) => {
    const pdf = new JsPDF();

    if (
      currentProject?.idea_articulation?.selected &&
      currentProject?.idea_articulation?.data.length > 0
    ) {
      pdf.setFontSize(18);

      pdf.text(15, 10, `Project: ${currentProject?.name}`);

      pdf.setFontSize(14);

      pdf.text(15, 20, "Journey #1: Zero to coming soon");

      pdf.text(15, 30, "Idea Articulation:");

      pdf.setFontSize(10);
      pdf.autoTable({
        theme: "striped",
        head: [["Title", "Description"]],
        body: currentProject?.idea_articulation?.data.map((item) => [item.key, item.value]),
        startY: 40,
        startX: 0,
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      });
    }

    if (
      currentProject?.idea_validation?.selected &&
      currentProject?.idea_validation?.data[0].value.length > 0
    ) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, `Problem Solution Fit:`, {
        maxWidth: 160,
      });
      // pdf.text(20, 30, `Problem Solution Fit:`);

      pdf.setFontSize(10);

      pdf.text(20, 20, `${currentProject?.idea_validation?.data[0].key}`, {
        maxWidth: 160,
      });

      // pdf.setFontSize(8);

      pdf.autoTable({
        theme: "grid",
        head: [["Problem", "Solution"]],
        body: currentProject?.idea_validation?.data[0].value.map((item) => [
          item.Problem,
          item.Solution,
        ]),
        startY: 40,
        startX: 0,
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      });
    }

    if (
      currentProject?.brand_kit?.selected &&
      typeof currentProject?.brand_kit?.data[0]?.value === "object"
    ) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, `Brand Kit:`, {
        maxWidth: 160,
      });

      const data = Object.entries(currentProject?.brand_kit?.data[0].value);

      pdf.setFontSize(10);

      pdf.autoTable({
        theme: "striped",
        head: [["Title", "Description"]],
        body: data.map((item) => [item[0], item[1]]),
        startY: 40,
        startX: 0,
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      });
    }
    if (
      currentProject?.product_development?.selected &&
      typeof currentProject?.product_development?.data[0]?.value === "object"
    ) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(20, 10, `Product Development:`, {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(20, 20, "Positioning Statement:", {
        maxWidth: 160,
      });

      pdf.text(20, 30, `${currentProject?.product_development?.data[0].value.Positioning}`, {
        maxWidth: 160,
      });
      pdf.text(20, 50, "USPs:", {
        maxWidth: 160,
      });
      /* eslint-disable-next-line no-plusplus */
      for (let i = 0; i < currentProject?.product_development?.data[0].value?.USPs.length; i++) {
        pdf.text(
          20,
          20 * (i + 3),
          `${i + 1}) ${currentProject?.product_development?.data[0].value?.USPs[i]}`,
          {
            maxWidth: 160,
          }
        );
      }

      pdf.addPage();

      pdf.text(20, 20, "Favcy Venture Builder Framework:", {
        maxWidth: 160,
      });

      pdf.autoTable({
        theme: "grid",
        head: [["Benefit", "Feature", "Value Proposition"]],
        body: currentProject?.product_development?.data[0].value[
          "Favcy_Venture_builder_framework"
        ].map((item) => [item.Benefit, item.Feature, item.Value_Proposition]),
        startY: 40,
        styles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 127, 80],
        },
      });
    }
    if (
      currentProject?.product_launch?.selected &&
      currentProject?.product_launch?.data?.length > 0
    ) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(20, 20, "Coming Soon Page", {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(20, 30, currentProject?.product_launch?.data[0].value, {
        maxWidth: 160,
      });
    }

    // if (currentProject?.product_growth?.data.length > 0) {
    //   pdf.addPage();

    //   pdf.setFontSize(18);

    //   pdf.text(20, 20, 'Product Growth', {
    //     maxWidth: 160,
    //   });

    //   pdf.setFontSize(10);

    //   pdf.text(20, 30, currentProject?.product_growth?.data[0].value, {
    //     maxWidth: 160,
    //   });
    // }
    if (currentProject?.mvp_page?.selected && currentProject?.mvp_page?.data[0].value) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, currentProject?.mvp_page?.data[0].key, {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(15, 30, currentProject?.mvp_page?.data[0].value, {
        maxWidth: 160,
      });
    }

    if (currentProject?.journey1_tab7?.selected && currentProject?.journey1_tab7?.data[0].value) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, "Monetizing Features", {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(15, 30, currentProject?.journey1_tab7?.data[0].value, {
        maxWidth: 160,
      });
    }

    pdf.setFontSize(18);

    // pdf.text(15, 10, `Project: ${currentProject?.name}`);

    pdf.addPage();

    pdf.setFontSize(14);

    pdf.text(15, 20, `Journey #2: Pre-Product Hustle`);

    if (currentProject?.journey2_tab3?.selected && currentProject?.journey2_tab3?.data[0]?.value) {
      pdf.text(15, 30, `Aligning Resources and Manpower`);

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

      pdf.text(15, 10, "Deep Dive : Reach Pillar", {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(15, 30, currentProject.journey2_tab4.data[0].value, {
        maxWidth: 160,
      });
    }
    if (currentProject?.journey2_tab5?.data[0]?.value && !currentProject?.journey2_tab5?.selected) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, "Deep Dive : Nurture Pillar", {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(15, 30, currentProject.journey2_tab5.data[0].value, {
        maxWidth: 160,
      });
    }

    if (currentProject?.journey2_tab6?.selected && currentProject?.journey2_tab6?.data[0]?.value) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, "Deep Dive : Committment Pillar", {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(15, 30, currentProject.journey2_tab6.data[0].value, {
        maxWidth: 160,
      });
    }

    if (currentProject?.journey2_tab7?.selected && currentProject?.journey2_tab7?.data[0]?.value) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, "Deep Dive : Customer Success Pillar", {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(15, 30, currentProject.journey2_tab7.data[0].value, {
        maxWidth: 160,
      });
    }
    if (currentProject?.journey2_tab8?.selected && currentProject?.journey2_tab8?.data[0]?.value) {
      pdf.addPage();

      pdf.setFontSize(18);

      pdf.text(15, 10, "Enablin Tech Pre-Product", {
        maxWidth: 160,
      });

      pdf.setFontSize(10);

      pdf.text(15, 30, currentProject?.journey2_tab8?.data[0].value, {
        maxWidth: 160,
      });
    }

    let pdfContent = pdf.output("datauristring");

    const byteString = atob(pdfContent.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const file = new File([blob], `${currentProject?.name}.pdf`, { type: "application/pdf" });

    // Use the file as needed (e.g., save it or send it to the server)

    // console.log(pdfContent, 'pdfContent');

    // pdf.save(`${currentProject?.name}.pdf`);
    if (!file) {
      reject("Error");
    }

    resolve(file);
  });
};
