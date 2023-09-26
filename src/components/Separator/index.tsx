import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Separator() {
  return (
    <View style={styles.container}></View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
    backgroundColor: "#FFF",
    marginVertical: 10
  },
})