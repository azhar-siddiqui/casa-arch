import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerDetailsLeadsMutation } from "../../app/services/leadsServices";
import Loc from "../../assets/LeadsIcons/Loc.svg";
import SuccessModal from "../SuccessModal/SuccessModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LeadsCards = () => {
  const [customerDetailsLeads, { isSuccess, isError, data }] =
    useCustomerDetailsLeadsMutation();

  const [leadsData, setLeadsData] = useState([])
  const [visible, setVisible] = useState(true);
  let Token = localStorage.getItem("Token");
  const navigate = useNavigate()

  const param = useParams();
  const { leadsIdToRemove } = useSelector(state => state.professional)

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (leadsIdToRemove === null) return
    if (leadsData === undefined) return
    if (leadsData.length < 1) return

    leadsData.map((lead, idx) => {
      if (lead.id === leadsIdToRemove) {
        if (idx + 1 === leadsData.length) return
        navigate(`/leadsListing/${leadsData[idx+1].id}`)
      }
    })

  }, [leadsIdToRemove])
  // console.log(leadsData);

  useEffect(() => {
    customerDetailsLeads(Token)
      .then(res => {
        setLeadsData(res.data.data);
      })
  }, [])

  return (
    <>
      <div className="lg:pl-24 w-full lg:w-[416px] h-screen overflow-auto">
        <p className="text-center text-sm font-semibold text-[#939CA3] py-5 border-b border-[#939CA3]">
          Showing all {leadsData.length} Leads
        </p>
        {/*  */}
        {leadsData.length >= 1 && leadsData.map((value) => (
          <Link to={`/leadsListing/${value.id}`} key={value.id}>
            <div className="p-3 pb-0 lg:p-0">
              <div
                className={`border-b border-[#939CA3] w-full h-[181px] p-4  lg:border-t-0 lg:border-r-0 ${parseInt(param.id) === value.id
                  ? "border-l-4 border-l-[#F36C25]"
                  : "border-l-0"
                  }`}
              >
                <h1 className="text-[20px] font-semibold">{value.name}</h1>
                <p className="text-[16px] font-normal text-[#000000]">
                  {value.design_type === 1
                    ? "Commercial Design"
                    : "Architecture Design"}
                </p>
                <p className="text-[#939CA3] text-sm font-normal pt-1 pb-3">
                  Create new interiors/{value.aesthetic_req}/{value.rooms}
                </p>
                <span className="flex items-center">
                  <img src={Loc} alt="Location" />
                  <p className="text-[16px] text-[#939CA3] font-semibold pl-3">
                    {value.pincode}
                  </p>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visible && <SuccessModal massage="Finding suitable client for you" />}
    </>
  );
};

export default LeadsCards;
