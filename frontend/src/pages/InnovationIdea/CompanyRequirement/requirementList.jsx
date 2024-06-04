import React, { useState, useEffect } from "react"
import { Button } from "antd"
import axios from "axios"
import { deployedAPI } from "../../../utils/form.constants"
import { List, Avatar } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { getAllIdeas } from "../../../api/idea"
import { localStorageConstant } from "../../../utils/global.constants"

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

const CompanyRequirementList = () => {
  const navigate = useNavigate()
  const [fetchReq, setFetchReq] = useState([])

  useEffect(() => {
    const fetchRequirement = async () => {
      let requirement = await axios.get(`${deployedAPI}/requirements/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
        }
      }).then((res) => res = res.data.data)
      console.log('>> requirement', requirement)
      setFetchReq(requirement)
    }
    fetchRequirement()
  }, [])

  return (
    <div style={{
      padding: '0 78px',
      margin: '0 auto',
      width: '60%',
      alignItems: 'center',
    }}>
      <h1 style={{ textAlign: 'center' }}>Yêu cầu của tôi</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: '5rem' }}>
        {/* <Button onClick={handleSort} style={{
          minWidth: 150
        }}>
          {sortTypes[sortIndex].name}
        </Button> */}
        <Button
          type="primary"
          onClick={() => navigate("/company")}
          style={{
            maxWidth: 150,
          }}
        >
          Tạo yêu cầu
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={fetchReq}
        renderItem={(item, index) => (
          <List.Item>
            <hr />
            <List.Item.Meta
              title={<Link to={`/match-idea/${index}`}>{item.problem}</Link>}
              description={item.domain.map((domain) => domain).join(", ")}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
export default CompanyRequirementList
