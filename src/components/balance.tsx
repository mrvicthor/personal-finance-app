import { getBalance } from "@/features/overview/actions/overview";
import Cards from "./cards";
import { getUser } from "@/lib/dal";

const Balance = async () => {
  const user = await getUser();
  const result = await getBalance(user?.id as number);
  return <Cards data={result} />;
};

export default Balance;
