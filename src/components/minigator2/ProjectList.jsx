"use client";

import React, { useEffect, useReducer, useRef, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import axios from "axios";
import { formatDistance } from "date-fns";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const INITIAL_STATE = {
  loading: false,
  error: "",
  projects: [],
};

const ACTION_TYPES = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SEARCH_PROJECT: "SEARCH_PROJECT",
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTION_TYPES.SEARCH_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => {
          return project.name
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    default:
      return state;
  }
};

const Project = ({
  id,
  name,
  updatedAt,
  active,
  setActive,
  index,
  setIndex,
  setLoading,
  setError,
}) => {
  const api = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();
  const pathname = usePathname();

  const handleProject = async () => {
    let url = api + `/api/minigator?id=${id}`;
    setActive(index);
    const query = `?id=${id}`;
    router.push(`${pathname}${query}`);
    setLoading(true);
    try {
      let result = await axios.get(url);
      if (result.data.success) {
        setIndex(result.data.index);
      } else {
        toast.error(result.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setError(error?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };
  return (
    <div
      className={classNames({
        "flex gap-5 items-start justify-start w-full rounded-md my-2 p-2 cursor-pointer": true,
        "bg-gray-100/50": active !== index,
        "bg-brand/20 border-b-2 border-brand": active === index,
      })}
      onClick={handleProject}
    >
      <div>
        <p className="text-md font-medium">{name}</p>
        <p className="text-[11px]">
          {formatDistance(new Date(updatedAt), new Date(), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

function ProjectList({ index, setIndex, setLoading, setError }) {
  const [state, dispatch] = useReducer(projectReducer, INITIAL_STATE);
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(1);
  const [isOver, setIsOver] = useState(false);
  const endref = useRef(null);

  const api = process.env.NEXT_PUBLIC_URL;

  const searchParams = useSearchParams();

  let projectId = searchParams.get("id");

  const getProjects = async () => {
    dispatch({ type: "FETCH_START" });
    try {


      let res = await axios.get(`${api}/api/project?page=${page}`, {
        headers: {
          "Content-Type": "application/json",

        },
      });

      if (res.data.success) {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.data });

        if (res.data.data.length < 10) {
          setIsOver(true);
        }

        setFilteredProjects([...filteredProjects, ...res.data.data]);

        if (res.data.data.length === 0) {
          dispatch({ type: "FETCH_ERROR", payload: "No projects found" });
        }
      }
    } catch (error) {
      // console.log(error);
      dispatch({ type: "FETCH_ERROR", payload: "Something went wrong" });
      return;
    }
  };

  useEffect(() => {

    getProjects();

  }, [page]);

  useEffect(() => {
    if (endref.current && filteredProjects.length > 10) {
      endref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredProjects]);

  useEffect(() => {
    if (search === "") {
      // If the search input is empty, show all projects
      setFilteredProjects(state.projects);
    } else {
      // Otherwise, filter the projects based on the search input
      const filtered = state.projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [search]);

  // useEffect(()=>{
  //   if(projectId && filteredProjects.length >0){
  //     setActive(filteredProjects.find((item) => String(item._id) === projectId))
  //   }
  // },[projectId])

  return (
    <div className="w-1/4 h-full">
      <div className="flex items-center flex-col justify-between m-2">

        <div className="bg-gray-100  w-full rounded-md flex items-center justify-between px-4 py-1">
          <MagnifyingGlassIcon className="w-5 h-5 text-[#808182]" />
          <input
            type="text"
            placeholder="Search Projects"
            className={classNames({
              "outline-none px-4 w-full text-md bg-[#F1F2F4] ": true,
            })}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="h-full scrollbar-thin overflow-y-scroll">
        {state.loading && (
          <div className="w-full">
            <div
              className="space-y-4 w-full rounded-2xl bg-white/5 p-4 relative 
                    before:absolute before:inset-0
                    before:-translate-x-full
                    before:animate-[shimmer_1s_infinite]
                    before:bg-gradient-to-r
                    before:from-transparent before:via-gray-400/10 before:to-transparent  isolate
                    overflow-hidden"
            >
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div className="flex gap-4 justify-between items-center">
                    <div className="h-16 w-16 rounded-lg bg-gray-300/20"></div>
                    <div className="flex flex-col w-full gap-1 items-start justify-start">
                      <div className="h-5 w-40 rounded-lg bg-gray-300/20"></div>
                      <div className="h-3 w-16 rounded-lg bg-gray-300/20"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <Link href={"/minigator/upload-and-chat"} className={classNames({
          "flex gap-5 items-center justify-center w-full rounded-md my-2 p-2 cursor-pointer": true,
          "bg-white border border-brand": true,
        })}
        >
          <PlusIcon className="w-5 h-5 text-brand" />
          <p className="text-md font-medium text-brand">Upload and chat</p>
        </Link>

        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, id) => (

            <Project
              key={project._id}
              index={id}
              {...project}
              active={active}
              setActive={setActive}
              setIndex={setIndex}
              setLoading={setLoading}
              setError={setError}
              id={project._id}
            />

          ))
        ) : (
          <p className="my-3 text-center">No projects found</p>
        )}
        {!isOver && (
          <p
            ref={endref}
            className="bg-brand/20 cursor-pointer text-center px-4 w-full py-2 text-black rounded-md"
            onClick={() => {
              setPage((val) => val + 1);
            }}
          >
            Load More
          </p>
        )}

      </div>
    </div>
  );
}

export default ProjectList;
