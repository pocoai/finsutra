import { React, useEffect, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";

const work = [
  { id: "____________" },
  { name: "Product Designer" },
  { name: "Web Designer" },
  { name: "Developer" },
  { name: "Team Lead" },
  { name: "Founder/Executive" },
  { name: "Other" },
];
const org = [
  { id: "____________" },
  { name: "Enterprise" },
  { name: "Start-up (1-50)" },
  { name: "Start-up (50+)" },
  { name: "UI/UX agency" },
  { name: "Branding firm" },
  { name: "I'm a freelancer" },
];
const goal = [
  { id: "____________" },
  { name: "Build website" },
  { name: "Create & manage systems" },
  { name: "Create prototype" },
  { name: "Build a business" },
  { name: "Other" },
];
const skill = [
  { id: "____________" },
  { name: "React" },
  { name: "NodeJs" },
  { name: "Html" },
  { name: "Python" },
];

export const WorkDropdown = ({ value, selectedWork, setSelectedWork }) => {
  useEffect(() => {
    setSelectedWork(work[0]);
  }, [value]);

  let ref = useRef(null);

  return (
    <div className=" lg:mr-1 text-black ">
      <div ref={ref}></div>
      <Listbox value={selectedWork} onChange={setSelectedWork}>
        {({ open }) => (
          <>
            <div className="relative ">
              <Listbox.Button
                // onMouseEnter={({ target }) => (open ? "" : target.click())}
                // onMouseLeave={() => {
                //   ref.current.click();
                // }}

                className="flex relative cursor-default text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 lg:text-2xl text-sm "
              >
                <span className="block truncate lg:translate-y-[12%] text-brand">
                  {selectedWork.name}
                  {selectedWork.id}
                </span>
                <p className="lg:text-2xl lg:translate-y-[15%]">{","}</p>
                {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              _____________
            </span> */}
              </Listbox.Button>
              <Transition
                // as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {open && (
                  <Listbox.Options
                    static
                    className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
                  >
                    {value === "work" &&
                      work.map((work, workIdx) => (
                        <Listbox.Option
                          key={workIdx}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active ? "bg-gray-100 text-black " : "text-gray-900"
                            }`
                          }
                          value={work}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {work.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                )}
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

// export default Dropdown;

export const OrgDropdown = ({ value, selectedOrg, setSelectedOrg }) => {
  useEffect(() => {
    setSelectedOrg(org[0]);
  }, [value]);
  let ref = useRef(null);

  return (
    <div className=" lg:mr-1 text-black ">
      <div ref={ref}></div>
      <Listbox value={selectedOrg} onChange={setSelectedOrg}>
        {({ open }) => (
          <>
            <div className="relative ">
              <Listbox.Button
                // onMouseEnter={({ target }) => (open ? "" : target.click())}
                // onMouseLeave={() => {
                //   ref.current.click();
                // }}
                className="flex relative cursor-default text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 lg:text-2xl text-sm"
              >
                <span className="block truncate lg:translate-y-[12%] text-brand">
                  {selectedOrg.name}
                  {selectedOrg.id}
                </span>
                <p className="lg:text-2xl lg:translate-y-[15%]">{","}</p>
              </Listbox.Button>
              <Transition
                // as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {open && (
                  <Listbox.Options
                    static
                    className="absolute mt-1  max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
                  >
                    {org.map((org, orgIdx) => (
                      <Listbox.Option
                        key={orgIdx}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4  ${
                            active ? "bg-gray-100 text-black" : "text-gray-900"
                          }`
                        }
                        value={org}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {org.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export const GoalDropdown = ({ value, selectedGoal, setSelectedGoal }) => {
  useEffect(() => {
    setSelectedGoal(goal[0]);
  }, [value]);
  let ref = useRef(null);

  return (
    <div className=" lg:mr-1 text-black">
      <div ref={ref}></div>
      <Listbox value={selectedGoal} onChange={setSelectedGoal}>
        {({ open }) => (
          <>
            <div className="relative ">
              <Listbox.Button
                // onMouseEnter={({ target }) => (open ? "" : target.click())}
                // onMouseLeave={() => {
                //   ref.current.click();
                // }}
                className=" relative cursor-default text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 lg:text-2xl text-sm flex"
              >
                <span className="block truncate lg:translate-y-[12%] text-brand">
                  {selectedGoal.name}
                  {selectedGoal.id}
                </span>
                <p className="lg:text-2xl lg:translate-y-[15%]">{","}</p>
                {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              _____________
            </span> */}
              </Listbox.Button>
              <Transition
                // as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {open && (
                  <Listbox.Options
                    static
                    className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
                  >
                    {goal.map((goal, goalIdx) => (
                      <Listbox.Option
                        key={goalIdx}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? "bg-gray-100 text-black" : "text-gray-900"
                          }`
                        }
                        value={goal}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {goal.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
export const SkillDropdown = ({ value, selectedSkill, setSelectedSkill }) => {
  useEffect(() => {
    setSelectedSkill(skill[0]);
  }, [value]);
  let ref = useRef(null);

  return (
    <div className=" lg:mr-1 text-black ">
      <div ref={ref}></div>
      <Listbox value={selectedSkill} onChange={setSelectedSkill}>
        {({ open }) => (
          <>
            <div className="relative ">
              <Listbox.Button
                // onMouseEnter={({ target }) => (open ? "" : target.click())}
                // onMouseLeave={() => {
                //   ref.current.click();
                // }}
                className="flex  relative cursor-default text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 lg:text-2xl text-sm"
              >
                <span className="block truncate lg:translate-y-[12%] text-brand">
                  {selectedSkill.name}
                  {selectedSkill.id}
                </span>
                <p className="lg:text-2xl lg:translate-y-[15%]">{"."}</p>
                {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              _____________
            </span> */}
              </Listbox.Button>
              <Transition
                // as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {open && (
                  <Listbox.Options
                    static
                    className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
                  >
                    {skill.map((skill, skillIdx) => (
                      <Listbox.Option
                        key={skillIdx}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? "bg-gray-100 text-black" : "text-gray-900"
                          }`
                        }
                        value={skill}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {skill.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
