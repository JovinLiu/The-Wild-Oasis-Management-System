import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  const filterField = "last";
  const filterOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
  ];

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <Filter field={filterField} options={filterOptions} />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
