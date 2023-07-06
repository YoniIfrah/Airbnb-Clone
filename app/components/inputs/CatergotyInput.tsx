'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface CatergotyInputProps  {
    icon: IconType
    label: string
    selected?: boolean
    onClick: (value: string) => void
}

const CatergotyInput: React.FC<CatergotyInputProps> = ({icon:Icon, label, selected, onClick}) => {
    return ( 
        <div
          onClick={() => onClick(label)}
          className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
          `}
        >
          <Icon size={30} />
          <div className="font-semibold">
            {label}
          </div>
        </div>
       );
}

export default CatergotyInput