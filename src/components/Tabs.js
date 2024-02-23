import React, { useState } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';

const Tabs = ({ tabComponents }) => {
  const [activeKey, setActiveKey] = useState(0);

  return (
    <>
      <CNav variant="tabs">
        {tabComponents.map((tab, index) => (
          <CNavItem key={index}>
            <CNavLink
              href="#"
              active={activeKey === index}
              onClick={() => setActiveKey(index)}
            >
              {tab.title}
            </CNavLink>
          </CNavItem>
        ))}
      </CNav>
      <CTabContent>
        {tabComponents.map((tab, index) => (
          <CTabPane key={index} visible={activeKey === index}>
            <div className="tab-content">
              {/* Render both form inputs and additional components for each tab */}
              {tab.formInputs && Object.values(tab.formInputs).map((input, inputIndex) => (
                <div key={inputIndex}>{input}</div>
              ))}
              {/* Render additional components if provided */}
              {tab.additionalComponent && (
                <div>{tab.additionalComponent}</div>
              )}
              {/* Render subTabs if provided */}
              {tab.subTabs && tab.subTabs}
            </div>
          </CTabPane>
        ))}
      </CTabContent>
    </>
  );
};

export default Tabs;
