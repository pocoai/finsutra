"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AccordionList, Accordion, AccordionHeader, AccordionBody } from "@tremor/react";
import { getProjects } from "@/helpers/admin";
import ProjectDetails from "./ProjectDetails";

const ViewModal = ({ selectedUser, setSelectedUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState({});

  const openModal = async () => {
    setOpen(true);
    setLoading(true);
    const projectsRes = await getProjects(selectedUser.userId);
    setProjects(projectsRes);
    setLoading(false);
  };

  const closeModal = () => {
    setOpen(false);
    setProjects({});
    setSelectedUser({});
  };

  useEffect(() => {
    openModal();
  }, [selectedUser]);

  // console.log(projects);
  // console.log(selectedUser);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform overflow-y-scroll p-6 text-left align-middle shadow-xl transition-all relative w-[80%] h-full bg-white border border-[#866FA4] rounded-md">
                <div className="text-md m-4">
                  <h1 className="font-semibold text-xl my-5 text-orange-600">
                    {selectedUser.firstName}&apos;s Projects
                  </h1>

                  {loading && <span className="loading loading-spinner text-warning"></span>}
                  {projects.length > 0 && (
                    <AccordionList className="border-2">
                      {projects.map((item, i) => (
                        <Accordion key={item.id}>
                          <AccordionHeader>
                            {i + 1}. {item.name}
                          </AccordionHeader>
                          <AccordionBody>
                            <ProjectDetails project={item} />
                          </AccordionBody>
                        </Accordion>
                      ))}
                    </AccordionList>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewModal;
