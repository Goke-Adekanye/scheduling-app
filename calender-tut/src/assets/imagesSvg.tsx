export const CalenderSvg = () =>  <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"/></svg>
export const TimeSvg = () =>  <svg width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256c141.4,0,256-114.6,256-256S397.4,0,256,0z M256,469.3
c-117.8,0-213.3-95.5-213.3-213.3c0-117.8,95.5-213.3,213.3-213.3c117.8,0,213.3,95.5,213.3,213.3
C469.3,373.8,373.8,469.3,256,469.3z M277.3,85.3h-42.7V256l96,96l32-32l-85.3-85.3V85.3z"/>
</svg>

export const ChevronLeftSvg = () =>  <div className="chevron"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path
 d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
 fill="currentColor" /> </svg></div>

 export const ChevronLeft = ({onClick}:any) =>  <div className="chevron-left" onClick={onClick}><ChevronLeftSvg/></div>
 export const ChevronRight = ({onClick}:any) =>  <div className="chevron-right" onClick={onClick}><ChevronLeftSvg/></div>

 export const ChevronRightDouble = ({onClick}:any) => (
    <div className="chevron-right-double" onClick={onClick}>
        <ChevronLeftSvg/>
        <ChevronLeftSvg/>
    </div>
 )
 export const ChevronLeftDouble = ({onClick}:any) => (
    <div className="chevron-left-double" onClick={onClick}>
        <ChevronLeftSvg/>
        <ChevronLeftSvg/>
    </div>
 )