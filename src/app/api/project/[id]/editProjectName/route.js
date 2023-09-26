import Project from "@/models/Project";
import User from "@/models/User";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { connectDb } from "@/app/lib/connectDb";

await connectDb();

export async function PATCH(request, {params}){
    const { value } = await request.json();
    const id = params.id;

    try {
        let updatedProject = await Project.findByIdAndUpdate(
            { _id: id },
            {name: value},
            {new: true}
            );
        return NextResponse.json({
            success: true, 
            data: updatedProject
        })
    } catch (error) {
        console.error(error)
    }
}