import React, { useState, useEffect } from 'react'
import defaultImg from "../../../../images/default-img.png"
import "./MainInstance.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
function MainInstance() {
  //TEXT LENGTH ACCORDING to SCREEN
  const [textLength, setTextLength] = useState(100);
  useEffect(() => {
    function handleWindowResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth > 1600) {
        setTextLength(150);
      } else if (windowWidth < 1600 && windowWidth > 1000) {
        setTextLength(70);
      } else if (windowWidth > 999) {
        setTextLength(33);
      }
      else if (windowWidth > 400) {
        setTextLength(20);
      }
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }
  const defaultMessages = [
    {
      text: 'Choose option 1',
    },
    {
      text: 'Choose option 2 Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet.Choose option Lorem ipsum dolor sit amet.',
    },
    {
      text: 'Choose option 2 Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet.Choose option Lorem ipsum dolor sit amet.',
    },
    {
      text: 'Choose option 3',
    },
  ];
  return (
    <>
      <div className="Dashboard-Comp-card">
        <div className='Profile-display'>
          <span>
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <span style={{ marginLeft: '5px' }}>
              Huzaifa
            </span>
          </span>
          <div className='Pro-badge'>
            Pro
          </div>
        </div>
        <div>
          <button className='Add-new-Dash-btn'>
            Add new Instance
          </button>
        </div>

        <div className='images-section'>
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div>
          <h6 style={{ textAlign: 'start', marginLeft: "5px" }}>
            Contacts
          </h6>
          <div className='Contact-display'>
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
        {/* Messages */}
        <div>
          <h6 style={{ textAlign: 'start', margin: "10px 0 10px 5px" }}>
            Messages
          </h6>
        </div>
        <div className="table-wrap">
          <div className='scroll-style'>
            <tbody className='scrollable-body'>
              {defaultMessages.map((message, index) => (
                <tr className='msg-body-dash' key={index} style={{ verticalAlign: "baseline" }}>
                  <td>
                    <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
                      style={{ cursor: 'pointer' }}
                    />
                    <span>
                      Huzaifa
                    </span>
                  </td>
                  <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* {createTooltip(message.text, `tooltip${index}`)} */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip${index}`}>{message?.text}</Tooltip>}
                    >
                      <span data-tip={message.text} data-for={`tooltip${index}`}>
                        {truncateText(message.text, textLength)}
                      </span>
                    </OverlayTrigger>
                    <span>
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        onClick={() => handleSelectMessage(message)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainInstance
