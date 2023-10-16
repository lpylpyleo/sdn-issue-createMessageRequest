'use client'

import {useSdnClient} from "@/lib/sdn";
import Button from "@/components/button/button";
import {particle} from "@/lib/particle";
import useLocalStorage from "@/lib/storage";
import Image from "next/image";
import scss from './styles.module.scss'
import {Visibility} from "sendingnetwork-js-sdk/lib/@types/partials";
import {Direction} from "sendingnetwork-js-sdk";
import {ReactNode} from "react";
import Textarea from "@/components/input/textarea";
import {TextareaAutosize} from "@mui/material";

export default function Page({params}: { params: { roomId: string } }) {
  // const address = '0xC4767B06C0BC38a49F7eccBbb2929d4d888A76A9';

  return (
    <div className={scss.page}>
      <Head/>
      <_Debug params={params} />
      {/*<MessageList>*/}
      {/*  {*/}
      {/*    Array.from(Array(30).keys()).map((e) => {*/}
      {/*        return <MessageItem key={e} msg={{sender: 'Alisakey', content: '尬死的尬死的嘎实打实的尬死的尬死的根深蒂固沙发和地方还是多喝水的功夫大师', isSelf: e % 2 == 0}}/>;*/}
      {/*      }*/}
      {/*    )*/}
      {/*  }*/}
      {/*</MessageList>*/}
      {/*<TextareaAutosize />*/}

    </div>
  )
}

function Head() {
  return (
    <div className={scss.head}>
      <Image className={scss.back_icon} src={'/dapp/icons/arrow_right.webp'} alt={''} width={24} height={24}/>
      <div style={{height: 12}}></div>
      <div className={scss.book_info}>
        <Image
          className={scss.book_cover}
          src={'/dapp/images/page-holo.webp'}
          alt={''}
          width={52}
          height={52}
        />
        <div style={{width: 10}}></div>
        <div className={scss.author_info}>
          <p className={scss.book_name}>DouPo Tianmo</p>
          <div style={{height: 10}}></div>
          <div>
            <p className={scss.author_name}>yangzi</p>
            <div style={{width: 5, display: 'inline-block'}}></div>
            <Image
              src={'/dapp/icons/twitter-small.webp'}
              alt={''}
              width={12}
              height={9}
            />
          </div>
        </div>
        <Button onClick={() => {
        }}>Buy</Button>
      </div>
      <div style={{height: 24}}></div>
      <div className={`${scss.info} ${scss.holding}`}>
        <p>You own <span>1</span> Bookbox</p>
        <p>0.4325 RCM</p>
      </div>
      <div style={{height: 8}}></div>
      <div className={`${scss.info} ${scss.price}`}>
        <p>9 holders 98 holding</p>
        <p>Bookbox price</p>
      </div>
      <div style={{height: 24}}></div>
    </div>
  )
}

interface Msg {
  sender: string,
  content: string,
  isSelf: boolean,
}

function MessageList({children}: { children: ReactNode }) {
  return (
    <div className={scss.messageList}>
      {children}
    </div>
  )
}

function MessageItem({msg}: { msg: Msg }) {
  return (
    <div className={`${scss.messageItem} ${msg.isSelf ? scss.me : scss.others}`}>
      <div className={scss.avatar}></div>
      <div className={`${scss.messageBody} ${scss['message-body__others']} `}>
        <div className={scss.sender}>{`${msg.sender}:`}</div>
        <div className={scss.content}>{msg.content}</div>
      </div>
    </div>
  )
}

function Input({msg}: { msg: Msg }) {
  return (
    <div className={`${scss.messageItem} ${msg.isSelf ? scss.me : scss.others}`}>
      <div className={scss.avatar}></div>
      <div className={`${scss.messageBody} ${scss['message-body__others']} `}>
        <div className={scss.sender}>{`${msg.sender}:`}</div>
        <div className={scss.content}>{msg.content}</div>
      </div>
    </div>
  )
}

function _Debug({params}: { params: { roomId: string } }) {

  console.log(params)
  const roomId = decodeURIComponent(params.roomId)

  const [sdnUserId, setSdnUserId] = useLocalStorage('sdn_user_id', '')
  const [sdnAccessToken, setSdnAccessToken] = useLocalStorage('sdn_access_token', '')

  console.log(sdnUserId, sdnAccessToken)
  const {data: client} = useSdnClient(sdnUserId, sdnAccessToken)

  console.log(client?.getAccessToken())

  const getDIDList = async () => {
    const address = await particle.evm.getAddress();
    const res = await client?.getDIDList(address)
    console.log(res)
  }

  const preDIDLogin = async () => {
    // const particleAddress = particle.;
    const address = await particle.evm.getAddress();

    const prefix = "did:pkh:eip155:1:";
    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    // const [address] = accounts;
    let {data: [did]} = await client?.getDIDList(address);
    const preLoginParams = did ? {did} : {address: `${prefix}${address}`}
    const {message, updated, random_server} = await client?.preDiDLogin1(preLoginParams)
    const sign = await particle.evm.personalSign(`0x${Buffer.from(message).toString('hex')}`)
    // const signed = await web3.eth.personal.sign(messageToSign, address, '');
    console.log(sign)

    let identifier = {
      did,
      address: did || `${prefix}${address}`,
      token: sign,
      message
    };
    const deviceId = localStorage.getItem("mx_device_id") || null;
    let loginParams = {
      type: "m.login.did.identity",
      updated,
      identifier,
      random_server,
      device_id: deviceId,
      // initial_device_display_name: this.defaultDeviceDisplayName,
    };
    const result = await client?.DIDLogin(loginParams);
    const {access_token, user_id} = result;
    console.log(access_token, user_id)
    setSdnUserId(user_id)
    setSdnAccessToken(access_token)
  }

  const createRoom = async () => {
    const res = await client?.createRoom({visibility: Visibility.Public});
    console.log(res)
  }

  const getContacts = async () => {
    const list = await client?.getFavouriteList();
    console.log(list)
  }

  const join = async (roomId: string) => {
    const res = await client?.joinRoom(roomId);
    console.log(res)
  }

  const sendTextMessage = async (msg: string) => {
    const res = await client?.sendTextMessage(roomId, msg);
    console.log(client)
    console.log(res)
  }

  const getMessages = async () => {
    const res = await client?.createMessagesRequest(roomId, '', 20, Direction.Backward);
    console.log(client)
    console.log(res)
  }

  return (
    <div>
      <Button onClick={getDIDList}>getDIDList</Button>
      <Button onClick={preDIDLogin}>preDIDLogin</Button>
      <Button onClick={createRoom}>createRoom</Button>
      <Button onClick={getContacts}>getContacts</Button>
      <Button onClick={() => console.log(client?.getAccessToken())}>getAccessToken</Button>
      <Button onClick={() => join(roomId)}>join</Button>
      <Button onClick={() => sendTextMessage('hello')}>sendTextMessage</Button>
      <Button onClick={getMessages}>getMessages</Button>
    </div>
  )
}
