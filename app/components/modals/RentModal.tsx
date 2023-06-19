'use client';
import React from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'

function RentModal() {
    const rentModal = useRentModal()
  return (
    <Modal title="Airbnb your home"
     isOpen={rentModal.isOpen}
     onClose={rentModal.onClose}
     onSubmit={rentModal.onClose}
     actionLabel='Submit'/>
  )
}

export default RentModal