import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  imageUrl?: string,
  name?: string

}

const AvatarIcon = ({imageUrl, name}: Props) => {
  return (
    <Avatar>
  <AvatarImage src={imageUrl} alt='user' />
  <AvatarFallback>{name?.toUpperCase()}</AvatarFallback>
</Avatar>
  )
}

export default AvatarIcon