<Modal
animationType="fade"
transparent={true}
visible={AccountmodalVisible}
onRequestClose={() => {
setModalVisible(!AccountmodalVisible);
}}
>
  <View style={styles.centeredView}>
  <View style={styles.modalView}>
    <Pressable
    style={[styles.button, styles.buttonClose]}
    onPress={() => setModalVisible(!modalVisible)}
    >
    <MaterialCommunityIcons name="close" size={30} />
    </Pressable>

    <View>
      <Text style={styles.modalHead}>Edit Profile Details</Text>
    </View>
    
    <Controller
      name="birthday"
      defaultValue=""
      control={control}
      render={({ field: { onChange, value } }) => (

        <View style={styles.mainInfoContainer}>
        <Text style={styles.detail}>Birthday</Text>
        <DatePicker date={value} onDateChange={onChange} />
        </View>

      )}
      />

      <Controller
      name="firstname"
      defaultValue=""
      control={control}
      render={({ field: { onChange, value } }) => (

        <View style={styles.mainInfoContainer}>
        <Text style={styles.detail}>First name</Text>
        <TextInput
            placeholder="First name"
            onChangeText={onChange}
            value={value}
          />
        </View>

      )}
      />

      <Controller
      name="lastname"
      defaultValue=""
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.mainInfoContainer}>
        <Text style={styles.detail}>Last name</Text>
        <TextInput
            placeholder="Last name"
            onChangeText={onChange}
            value={value}
          />
        </View>
      )}
      />

    <Controller
      name="crop"
      defaultValue=""
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.mainInfoContainer}>
        <Text style={styles.detail}>Crops you grow</Text>
        <TextInput
            placeholder="Crops you grow"
            onChangeText={onChange}
            value={value}
          />
        </View>
      )}
      />

    <Controller
      name="address"
      defaultValue=""
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.mainInfoContainer}>
        <Text style={styles.detail}>Address</Text>
        <TextInput
            placeholder="Address"
            onChangeText={onChange}
            value={value}
          />
        </View>
      )}
      />

    <Controller
      name="postal_Code"
      defaultValue=""
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.mainInfoContainer}>
        <Text style={styles.detail}>Postal code</Text>
        <TextInput
            placeholder="Postal code"
            onChangeText={onChange}
            value={value}
          />
        </View>
      )}
      />

      <MarketButton
        buttonName="Confirm"
        onPress={handleSubmit(onSubmit)}
      />


  </View>
  </View>
</Modal>