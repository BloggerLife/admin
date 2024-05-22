import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { customer, phoneNumber, totalAmount, products, email } =
      await req.json();

    const newOrder = await Order.create({
      customer,
      products,
      phoneNumber,
      totalAmount,
      email,
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { headers: corsHeaders });
  } catch (err) {
    console.log("[order_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
