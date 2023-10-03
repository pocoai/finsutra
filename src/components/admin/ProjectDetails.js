import React, { useEffect, useState } from "react";
import { AccordionList, Accordion, AccordionHeader, AccordionBody } from "@tremor/react";
import ViewComponent from "../project/ViewComponent";
import { journey1, journey2 } from "@/app/project/[id]/page";

// const steps = [
//   "idea_articulation",
//   "idea_validation",
//   "brand_kit",
//   "product_development",
//   "product_launch",
//   "mvp_page",
// ];

// const steps2 = [
//   "journey2_tab1",
//   "journey2_tab2",
//   "journey2_tab3",
//   "journey2_tab4",
//   "journey2_tab5",
//   "journey2_tab6",
//   "journey2_tab7",
// ];

const TabAccordion = ({ title, data, tab, journey }) => {
  // const journey = steps.find((item) => item === title) ? "1" : "2";
  // const stateValue1 = steps.findIndex((item) => item === title) + 1;
  // const stateValue2 = steps2.findIndex((item) => item === title) + 1;

  return (
    <Accordion>
      <AccordionHeader>{title}</AccordionHeader>
      <AccordionBody>
        <ViewComponent data={data} tab={tab} journey={journey} />
      </AccordionBody>
    </Accordion>
  );
};

const ProjectDetails = ({ project }) => {
  console.log(project, "inside");

  const [data, setData] = useState([]);

  useEffect(() => {
    let data = [];

    for (let i = 0; i < journey1.length; i++) {
      if (project.journey1 && project?.journey1[`tab${journey1[i].tab}`]?.selected) {
        data.push({
          data: project?.journey1[`tab${journey1[i].tab}`]?.data,
          journey: 1,
          tab: journey1[i].tab,
          title: journey1[i].title,
          id: i,
        });
      }

      if (project.journey2 && project?.journey2[`tab${journey2[i].tab}`]?.selected) {
        data.push({
          data: project?.journey2[`tab${journey2[i].tab}`]?.data,
          journey: 2,
          tab: journey2[i].tab,
          title: journey2[i].title,
          id: i,
        });
      }
    }

    setData(data);
  }, [project]);

  // console.log(data, "data");

  return (
    <AccordionList>
      {data.map((item) => (
        <TabAccordion
          key={item.id}
          title={item.title}
          data={item.data}
          tab={item.tab}
          journey={item.journey}
        />
      ))}
    </AccordionList>
  );
};

export default ProjectDetails;
