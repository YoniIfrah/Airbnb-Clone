import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    // getting the body from the http request
    const body = await request.json();

    // extract the relevent fields from the body
    const { listingId, startDate, endDate, totalPrice } = body;

    // checkign if the fields are not null or undefined
    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    // updating the DB with valid attributes
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
