const TargetIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 35 35" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4997 21.2598C15.4264 21.2598 13.7402 19.5731 13.7402 17.5002C13.7402 15.4274 15.4269 13.7407 17.4997 13.7407C19.5726 13.7407 21.2593 15.4274 21.2593 17.5002C21.2593 19.5731 19.5726 21.2598 17.4997 21.2598ZM17.4997 15.7909C16.5574 15.7909 15.7909 16.5574 15.7909 17.4997C15.7909 18.4421 16.5574 19.2085 17.4997 19.2085C18.4421 19.2085 19.2086 18.4421 19.2086 17.4997C19.2086 16.5574 18.4421 15.7909 17.4997 15.7909Z" />
    <path d="M17.4998 28.1638C11.6197 28.1638 6.83575 23.3798 6.83575 17.4998C6.83575 11.6197 11.6197 6.83575 17.4998 6.83575C23.3798 6.83575 28.1638 11.6197 28.1638 17.4998C28.1638 23.3798 23.3798 28.1638 17.4998 28.1638ZM17.4998 8.88653C12.7502 8.88653 8.88653 12.7502 8.88653 17.4998C8.88653 22.2494 12.7502 26.113 17.4998 26.113C22.2494 26.113 26.113 22.2494 26.113 17.4998C26.113 12.7502 22.2494 8.88653 17.4998 8.88653Z" />
    <path d="M17.4997 32.2653C13.5556 32.2653 9.8478 30.7293 7.05876 27.9407C4.26971 25.1522 2.73419 21.4439 2.73419 17.4997C2.73419 13.5556 4.27022 9.8478 7.05876 7.05876C9.84729 4.26971 13.5556 2.73419 17.4997 2.73419C21.4439 2.73419 25.1517 4.27022 27.9407 7.05876C30.7298 9.8478 32.2653 13.5556 32.2653 17.4997C32.2653 21.4439 30.7293 25.1517 27.9407 27.9407C25.1517 30.7298 21.4439 32.2653 17.4997 32.2653ZM17.4997 4.78496C10.4887 4.78496 4.78496 10.4887 4.78496 17.4997C4.78496 24.5108 10.4887 30.2145 17.4997 30.2145C24.5108 30.2145 30.2145 24.5108 30.2145 17.4997C30.2145 10.4887 24.5108 4.78496 17.4997 4.78496Z" />
    <path d="M33.9746 18.5251H24.4042C23.8376 18.5251 23.3788 18.0663 23.3788 17.4998C23.3788 16.9332 23.8376 16.4744 24.4042 16.4744H33.9746C34.5411 16.4744 35 16.9332 35 17.4998C35 18.0663 34.5411 18.5251 33.9746 18.5251Z" />
    <path d="M10.5958 18.5251H1.02539C0.45886 18.5251 0 18.0663 0 17.4998C0 16.9332 0.45886 16.4744 1.02539 16.4744H10.5958C11.1623 16.4744 11.6212 16.9332 11.6212 17.4998C11.6212 18.0663 11.1623 18.5251 10.5958 18.5251Z" />
    <path d="M17.4998 11.6212C16.9332 11.6212 16.4744 11.1623 16.4744 10.5958V1.02539C16.4744 0.45886 16.9337 0 17.4998 0C18.0658 0 18.5251 0.45886 18.5251 1.02539V10.5958C18.5251 11.1623 18.0663 11.6212 17.4998 11.6212Z" />
    <path d="M17.4998 35C16.9332 35 16.4744 34.5411 16.4744 33.9746V24.4042C16.4744 23.8376 16.9332 23.3788 17.4998 23.3788C18.0663 23.3788 18.5251 23.8376 18.5251 24.4042V33.9746C18.5251 34.5411 18.0663 35 17.4998 35Z" />
  </svg>
)

TargetIcon.defaultProps = {
  width: '35',
  height: '35',
  color: 'white',
}

export default TargetIcon