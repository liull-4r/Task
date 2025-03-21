import { useState } from "react";
import TabSwitcher from "../components/ui/TabSwitcher";
import Toolbar from "../components/ui/Toolbar";
import Approved from "../components/bank/Approved";
import Pending from "../components/bank/Pending";
export default function BankManagement() {
  const [activeTab, setActiveTab] = useState<"BANK" | "PENDING">("BANK");

  return (
    <div>
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      <br />
      {activeTab === "BANK" && (
        <div>
          {
            <>
              <Toolbar />
              <Approved />
            </>
          }
        </div>
      )}
      {activeTab === "PENDING" && (
        <div>
          {
            <>
              <Toolbar />
              <Pending />
            </>
          }
        </div>
      )}

      {/* <Pagination /> */}
    </div>
  );
}
