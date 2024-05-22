import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColums";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails } = await res.json();
  console.log(orderDetails);
  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name:{" "}
        <span className="text-base-medium">{orderDetails.customer}</span>
      </p>
      <p className="text-base-bold">
        Contact Number:{" "}
        <span className="text-base-medium">{orderDetails.phoneNumber}</span>
      </p>
      <p className="text-base-bold">
        Total Amount:{" "}
        <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
