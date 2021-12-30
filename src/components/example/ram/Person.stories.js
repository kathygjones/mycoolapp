import React from 'react'
import Person from './Person'

export function Person1() {
  return (
    <Person
      name="Mary Poppins"
      photoUrl="https://pixel.nymag.com/imgs/daily/vulture/2013/12/23/23-mary-poppins.w700.h700.jpg"
    />
  )
}

export function Person2() {
  return (
    <Person
      name="Mary Poppins"
      photoUrl="https://pixel.nymag.com/imgs/daily/vulture/2013/12/23/23-mary-poppins.w700.h700.jpg"
      relationshipDescription="Fairy godmother"
    />
  )
}

export default {
  title: 'Person',
}
