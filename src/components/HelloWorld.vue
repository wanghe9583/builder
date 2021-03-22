<template>
    <div class="main">
        <ConventionalLayout>
            <div slot="search">
                <Button type="primary" icon="ios-search" @click="page.get(1)">查询</Button>
            </div>
            <div slot="tools">
                <Button type="success" icon="ios-add" @click="target.addOpen('添加')">添加</Button>
            </div>
            <div slot="content">
                <div class="list">
                    <Table
                        border
                        :columns="columns"
                        :data="page.list"
                        :total="page.total"
                        @on-selection-change="selectChange"
                        @on-cell-click="tableCellClick"
                        stripe
                    ></Table>
                </div>
                <Spin fix v-show="page.loading">
                    <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
                <Page
                    class="page-top-bottom"
                    show-total
                    :total="page.total"
                    :page-size="page.pageSize"
                    :current="page.pageIndex"
                    @on-change="v=>page.get(v)"
                />
            </div>
        </ConventionalLayout>
        <div>
            <Modal
                v-model="target.add.visible"
                :title="target.add.title"
                class="modal-box"
                :mask-closable="false"
            >
                <Form :label-width="90">
                    <FormItem label="major">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择major"
                            v-model="target.add.obj.major"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Major"
                                :value="item"
                                :key="index"
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="class">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择class"
                            v-model="target.add.obj.class"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Class"
                                :value="item"
                                :key="index"
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_Gender">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_Gender"
                            v-model="target.add.obj.info_Gender"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_Gender"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_Nation">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_Nation"
                            v-model="target.add.obj.info_Nation"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_Nation"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_IdCardType">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_IdCardType"
                            v-model="target.add.obj.info_IdCardType"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_IdCardType"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_ResidenceType">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_ResidenceType"
                            v-model="target.add.obj.info_ResidenceType"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_ResidenceType"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_PoliticStatus">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_PoliticStatus"
                            v-model="target.add.obj.info_PoliticStatus"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_PoliticStatus"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_BloodType">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_BloodType"
                            v-model="target.add.obj.info_BloodType"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_BloodType"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_HealthState">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_HealthState"
                            v-model="target.add.obj.info_HealthState"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_HealthState"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_MarryState">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_MarryState"
                            v-model="target.add.obj.info_MarryState"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_MarryState"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_Faith">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_Faith"
                            v-model="target.add.obj.info_Faith"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_Faith"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_Gatq">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择info_Gatq"
                            v-model="target.add.obj.info_Gatq"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.Info_Gatq"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_NativePlace">
                        <Cascader
                            transfer
                            class="modal-width"
                            clearable
                            placeholder="请选择info_NativePlace"
                            :load-data="regionsLoad"
                            :data="ui.regions"
                            v-model="target.add.obj.info_NativePlace.codes"
                        ></Cascader>
                    </FormItem>
                    <FormItem label="info_ResidencePlace">
                        <Cascader
                            transfer
                            class="modal-width"
                            clearable
                            placeholder="请选择info_ResidencePlace"
                            :load-data="regionsLoad"
                            :data="ui.regions"
                            v-model="target.add.obj.info_ResidencePlace.codes"
                        ></Cascader>
                    </FormItem>
                    <FormItem label="info_BirthPlace">
                        <Cascader
                            transfer
                            class="modal-width"
                            clearable
                            placeholder="请选择info_BirthPlace"
                            :load-data="regionsLoad"
                            :data="ui.regions"
                            v-model="target.add.obj.info_BirthPlace.codes"
                        ></Cascader>
                    </FormItem>
                    <FormItem
                        label="xjInfo_EnrollYM"
                    >**没处理的对象** {{xjInfo_EnrollYM}}{{xjInfo_EnrollYM}}</FormItem>
                    <FormItem label="xjInfo_StudentType">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择xjInfo_StudentType"
                            v-model="target.add.obj.xjInfo_StudentType"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.XjInfo_StudentType"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="from_EnrollWay">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择from_EnrollWay"
                            v-model="target.add.obj.from_EnrollWay"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.From_EnrollWay"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="from_Region">
                        <Cascader
                            transfer
                            class="modal-width"
                            clearable
                            placeholder="请选择from_Region"
                            :load-data="regionsLoad"
                            :data="ui.regions"
                            v-model="target.add.obj.from_Region.codes"
                        ></Cascader>
                    </FormItem>
                    <FormItem label="from_StudentSource">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择from_StudentSource"
                            v-model="target.add.obj.from_StudentSource"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.From_StudentSource"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="from_OnStudyWay">
                        <Select
                            transfer
                            clearable
                            class="modal-width"
                            placeholder="请选择from_OnStudyWay"
                            v-model="target.add.obj.from_OnStudyWay"
                        >
                            <Option
                                v-for="(item,index) in ui.dics.From_OnStudyWay"
                                :value="item"
                                :key="index"
                            >{{item.v}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="info_Name">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_Name"
                            placeholder="请输入info_Name"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="info_Idno">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_Idno"
                            placeholder="请输入info_Idno"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="info_NameEn">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_NameEn"
                            placeholder="请输入info_NameEn"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="info_NamePy">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_NamePy"
                            placeholder="请输入info_NamePy"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="info_NamePrevious">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_NamePrevious"
                            placeholder="请输入info_NamePrevious"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="出生日期">
                        <DatePicker
                            type="date"
                            class="modal-width"
                            v-model="target.add.obj.info_Birthday"
                            disabled
                        />
                    </FormItem>
                    <FormItem label="info_Country">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_Country"
                            placeholder="请输入info_Country"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="info_Advantage">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_Advantage"
                            placeholder="请输入info_Advantage"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="info_ResidenceAddress">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_ResidenceAddress"
                            placeholder="请输入info_ResidenceAddress"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="info_PoliceStation">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.info_PoliceStation"
                            placeholder="请输入info_PoliceStation"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="link_Phone">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.link_Phone"
                            placeholder="请输入link_Phone"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="link_Email">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.link_Email"
                            placeholder="请输入link_Email"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="link_CommunicateNo">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.link_CommunicateNo"
                            placeholder="请输入link_CommunicateNo"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="link_PersonalSite">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.link_PersonalSite"
                            placeholder="请输入link_PersonalSite"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="link_Address">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.link_Address"
                            placeholder="请输入link_Address"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="link_Zipcode">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.link_Zipcode"
                            placeholder="请输入link_Zipcode"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="otherInfo_IsFlow">
                        <i-switch v-model="target.add.obj.otherInfo_IsFlow" />
                    </FormItem>
                    <FormItem label="otherInfo_IsFollowMove">
                        <i-switch v-model="target.add.obj.otherInfo_IsFollowMove" />
                    </FormItem>
                    <FormItem label="otherInfo_TrainRoute">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.otherInfo_TrainRoute"
                            placeholder="请输入otherInfo_TrainRoute"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="xjInfo_Xh">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.xjInfo_Xh"
                            placeholder="请输入xjInfo_Xh"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="xjInfo_Xjh">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.xjInfo_Xjh"
                            placeholder="请输入xjInfo_Xjh"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                    <FormItem label="xjInfo_Grade">
                        <InputNumber
                            :max="990"
                            :min="0"
                            placeholder="请输入xjInfo_Grade"
                            class="modal-width"
                            v-model="target.add.obj.xjInfo_Grade"
                        ></InputNumber>
                    </FormItem>
                    <FormItem label="出生日期">
                        <DatePicker
                            type="date"
                            class="modal-width"
                            v-model="target.add.obj.xjInfo_EnrollTime"
                            disabled
                        />
                    </FormItem>
                    <FormItem label="from_SourcePeriod">
                        <Input
                            class="modal-width"
                            v-model="target.add.obj.from_SourcePeriod"
                            placeholder="请输入from_SourcePeriod"
                            clearable
                            :maxlength="50"
                        />
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button @click="target.cancel()">取消</Button>
                    <Button type="primary" @click="save()">保存</Button>
                </div>
            </Modal>
        </div>
        <div>
            <Modal
                v-model="target.detail.visible"
                :title="target.detail.title"
                class="modal-box"
                :mask-closable="false"
            >
                <Form :label-width="90">
                    <FormItem label="major">
                        <label>{{target.detail.obj.major?target.detail.obj.major.name:null}}</label>
                    </FormItem>
                    <FormItem label="class">
                        <label>{{target.detail.obj.class?target.detail.obj.class.name:null}}</label>
                    </FormItem>
                    <FormItem label="info_Gender">
                        <label>{{target.detail.obj.info_Gender?target.detail.obj.info_Gender.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_Nation">
                        <label>{{target.detail.obj.info_Nation?target.detail.obj.info_Nation.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_IdCardType">
                        <label>{{target.detail.obj.info_IdCardType?target.detail.obj.info_IdCardType.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_ResidenceType">
                        <label>{{target.detail.obj.info_ResidenceType?target.detail.obj.info_ResidenceType.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_PoliticStatus">
                        <label>{{target.detail.obj.info_PoliticStatus?target.detail.obj.info_PoliticStatus.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_BloodType">
                        <label>{{target.detail.obj.info_BloodType?target.detail.obj.info_BloodType.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_HealthState">
                        <label>{{target.detail.obj.info_HealthState?target.detail.obj.info_HealthState.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_MarryState">
                        <label>{{target.detail.obj.info_MarryState?target.detail.obj.info_MarryState.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_Faith">
                        <label>{{target.detail.obj.info_Faith?target.detail.obj.info_Faith.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_Gatq">
                        <label>{{target.detail.obj.info_Gatq?target.detail.obj.info_Gatq.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_NativePlace">
                        <label>{{target.detail.obj.info_NativePlace?target.detail.obj.info_NativePlace.text:null}}</label>
                    </FormItem>
                    <FormItem label="info_ResidencePlace">
                        <label>{{target.detail.obj.info_ResidencePlace?target.detail.obj.info_ResidencePlace.text:null}}</label>
                    </FormItem>
                    <FormItem label="info_BirthPlace">
                        <label>{{target.detail.obj.info_BirthPlace?target.detail.obj.info_BirthPlace.text:null}}</label>
                    </FormItem>
                    <FormItem label="xjInfo_EnrollYM">
                        <label>**没处理的对象**{{target.detail.obj.xjInfo_EnrollYM}}</label>
                    </FormItem>
                    <FormItem label="xjInfo_StudentType">
                        <label>{{target.detail.obj.xjInfo_StudentType?target.detail.obj.xjInfo_StudentType.v:null}}</label>
                    </FormItem>
                    <FormItem label="from_EnrollWay">
                        <label>{{target.detail.obj.from_EnrollWay?target.detail.obj.from_EnrollWay.v:null}}</label>
                    </FormItem>
                    <FormItem label="from_Region">
                        <label>{{target.detail.obj.from_Region?target.detail.obj.from_Region.text:null}}</label>
                    </FormItem>
                    <FormItem label="from_StudentSource">
                        <label>{{target.detail.obj.from_StudentSource?target.detail.obj.from_StudentSource.v:null}}</label>
                    </FormItem>
                    <FormItem label="from_OnStudyWay">
                        <label>{{target.detail.obj.from_OnStudyWay?target.detail.obj.from_OnStudyWay.v:null}}</label>
                    </FormItem>
                    <FormItem label="info_Name">
                        <label>{{target.detail.obj.info_Name}}</label>
                    </FormItem>
                    <FormItem label="info_Idno">
                        <label>{{target.detail.obj.info_Idno}}</label>
                    </FormItem>
                    <FormItem label="info_NameEn">
                        <label>{{target.detail.obj.info_NameEn}}</label>
                    </FormItem>
                    <FormItem label="info_NamePy">
                        <label>{{target.detail.obj.info_NamePy}}</label>
                    </FormItem>
                    <FormItem label="info_NamePrevious">
                        <label>{{target.detail.obj.info_NamePrevious}}</label>
                    </FormItem>
                    <FormItem label="info_Birthday">
                        <label>{{target.detail.obj.info_Birthday?target.detail.obj.info_Birthday.substring(0, 10):null}}</label>
                    </FormItem>
                    <FormItem label="info_Country">
                        <label>{{target.detail.obj.info_Country}}</label>
                    </FormItem>
                    <FormItem label="info_Advantage">
                        <label>{{target.detail.obj.info_Advantage}}</label>
                    </FormItem>
                    <FormItem label="info_ResidenceAddress">
                        <label>{{target.detail.obj.info_ResidenceAddress}}</label>
                    </FormItem>
                    <FormItem label="info_PoliceStation">
                        <label>{{target.detail.obj.info_PoliceStation}}</label>
                    </FormItem>
                    <FormItem label="link_Phone">
                        <label>{{target.detail.obj.link_Phone}}</label>
                    </FormItem>
                    <FormItem label="link_Email">
                        <label>{{target.detail.obj.link_Email}}</label>
                    </FormItem>
                    <FormItem label="link_CommunicateNo">
                        <label>{{target.detail.obj.link_CommunicateNo}}</label>
                    </FormItem>
                    <FormItem label="link_PersonalSite">
                        <label>{{target.detail.obj.link_PersonalSite}}</label>
                    </FormItem>
                    <FormItem label="link_Address">
                        <label>{{target.detail.obj.link_Address}}</label>
                    </FormItem>
                    <FormItem label="link_Zipcode">
                        <label>{{target.detail.obj.link_Zipcode}}</label>
                    </FormItem>
                    <FormItem label="otherInfo_IsFlow">
                        <label>{{target.detail.obj.otherInfo_IsFlow}}</label>
                    </FormItem>
                    <FormItem label="otherInfo_IsFollowMove">
                        <label>{{target.detail.obj.otherInfo_IsFollowMove}}</label>
                    </FormItem>
                    <FormItem label="otherInfo_TrainRoute">
                        <label>{{target.detail.obj.otherInfo_TrainRoute}}</label>
                    </FormItem>
                    <FormItem label="xjInfo_Xh">
                        <label>{{target.detail.obj.xjInfo_Xh}}</label>
                    </FormItem>
                    <FormItem label="xjInfo_Xjh">
                        <label>{{target.detail.obj.xjInfo_Xjh}}</label>
                    </FormItem>
                    <FormItem label="xjInfo_Grade">
                        <label>{{target.detail.obj.xjInfo_Grade}}</label>
                    </FormItem>
                    <FormItem label="xjInfo_EnrollTime">
                        <label>{{target.detail.obj.xjInfo_EnrollTime?target.detail.obj.xjInfo_EnrollTime.substring(0, 10):null}}</label>
                    </FormItem>
                    <FormItem label="from_SourcePeriod">
                        <label>{{target.detail.obj.from_SourcePeriod}}</label>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button @click="target.detail.visible=false">关闭</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import ConventionalLayout from '@/components/ConventionalLayout';
export default {
    components: {
        ConventionalLayout
    },
    data() {
        return {
            ui: {
                regions1,
                regions2,
                regions3,
                regions4,
                dics: {
                    Major,
                    Class,
                    Info_Gender,
                    Info_Nation,
                    Info_IdCardType,
                    Info_ResidenceType,
                    Info_PoliticStatus,
                    Info_BloodType,
                    Info_HealthState,
                    Info_MarryState,
                    Info_Faith,
                    Info_Gatq,
                    XjInfo_StudentType,
                    From_EnrollWay,
                    From_StudentSource,
                    From_OnStudyWay,
                }
            },
            target: null,
            page: {},
            columns: [{
                title: "major",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.major ? p.row.major.name : null)
            }, {
                title: "class",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.class ? p.row.class.name : null)
            }, {
                title: "info_Gender",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Gender ? p.row.info_Gender.v : null)
            }, {
                title: "info_Nation",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Nation ? p.row.info_Nation.v : null)
            }, {
                title: "info_IdCardType",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_IdCardType ? p.row.info_IdCardType.v : null)
            }, {
                title: "info_ResidenceType",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_ResidenceType ? p.row.info_ResidenceType.v : null)
            }, {
                title: "info_PoliticStatus",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_PoliticStatus ? p.row.info_PoliticStatus.v : null)
            }, {
                title: "info_BloodType",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_BloodType ? p.row.info_BloodType.v : null)
            }, {
                title: "info_HealthState",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_HealthState ? p.row.info_HealthState.v : null)
            }, {
                title: "info_MarryState",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_MarryState ? p.row.info_MarryState.v : null)
            }, {
                title: "info_Faith",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Faith ? p.row.info_Faith.v : null)
            }, {
                title: "info_Gatq",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Gatq ? p.row.info_Gatq.v : null)
            }, {
                title: "info_NativePlace",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_NativePlace)
            }, {
                title: "info_ResidencePlace",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_ResidencePlace)
            }, {
                title: "info_BirthPlace",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_BirthPlace)
            }, {
                title: "xjInfo_EnrollYM",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.xjInfo_EnrollYM)
            }, {
                title: "xjInfo_StudentType",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.xjInfo_StudentType ? p.row.xjInfo_StudentType.v : null)
            }, {
                title: "from_EnrollWay",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.from_EnrollWay ? p.row.from_EnrollWay.v : null)
            }, {
                title: "from_Region",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.from_Region)
            }, {
                title: "from_StudentSource",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.from_StudentSource ? p.row.from_StudentSource.v : null)
            }, {
                title: "from_OnStudyWay",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.from_OnStudyWay ? p.row.from_OnStudyWay.v : null)
            }, {
                title: "info_Name",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Name)
            }, {
                title: "info_Idno",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Idno)
            }, {
                title: "info_NameEn",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_NameEn)
            }, {
                title: "info_NamePy",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_NamePy)
            }, {
                title: "info_NamePrevious",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_NamePrevious)
            }, {
                title: "info_Birthday",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Birthday ? p.row.info_Birthday.substring(0, 10) : null)
            }, {
                title: "info_Country",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Country)
            }, {
                title: "info_Advantage",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_Advantage)
            }, {
                title: "info_ResidenceAddress",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_ResidenceAddress)
            }, {
                title: "info_PoliceStation",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.info_PoliceStation)
            }, {
                title: "link_Phone",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.link_Phone)
            }, {
                title: "link_Email",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.link_Email)
            }, {
                title: "link_CommunicateNo",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.link_CommunicateNo)
            }, {
                title: "link_PersonalSite",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.link_PersonalSite)
            }, {
                title: "link_Address",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.link_Address)
            }, {
                title: "link_Zipcode",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.link_Zipcode)
            }, {
                title: "otherInfo_IsFlow",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.otherInfo_IsFlow)
            }, {
                title: "otherInfo_IsFollowMove",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.otherInfo_IsFollowMove)
            }, {
                title: "otherInfo_TrainRoute",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.otherInfo_TrainRoute)
            }, {
                title: "xjInfo_Xh",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.xjInfo_Xh)
            }, {
                title: "xjInfo_Xjh",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.xjInfo_Xjh)
            }, {
                title: "xjInfo_Grade",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.xjInfo_Grade)
            }, {
                title: "xjInfo_EnrollTime",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.xjInfo_EnrollTime ? p.row.xjInfo_EnrollTime.substring(0, 10) : null)
            }, {
                title: "from_SourcePeriod",
                align: "center",
                width: 200,
                render: (h, p) => h("label", p.row.from_SourcePeriod)
            }, {
                title: "操作",
                key: "caozuo",
                align: "center",
                width: 360,
                render: (h, p) => {
                    return h("div", [this.$api.createColBtn(h, "md-eye", "详情", () => {
                        this.target.detailOpen(p.row.id)
                    }), this.$api.createColBtn(h, "md-create", '编辑', () => {
                        this.target.editOpen(p.row.id)
                    }), this.$api.createColBtn(h, "ios-archive", '删除', () => {
                        this.target.delete(this, p.row.id, () => this.page.get())
                    }), p.row.isEnable == true ? this.$api.createColBtn(h, "md-close-circle", "禁用", () => this.target.disable(
                        this, p.row.id, () => this.page.get())) : this.$api.createColBtn(h, "md-open", "启用", () => this.target.enable(
                            this, p.row.id, () => this.page.get())),]);
                }
            }]
        }
    },
    methods: {
        save() {
            let obj = this.target.add.obj;
            this.target.save(this, () => {
                this.$Message.success('操作成功');
                this.page.get();
                this.target.cancel();
            });
        },
        regionsLoad(item, callback) {
            item.loading = true;
            this.$api.get("/Region/GetChilds", {
                parentCode: item.value
            }, res => {
                res.data.forEach(x => {
                    if (x.loading == null) delete x.loading;
                });
                item.children = res.data;
                item.loading = false;
                callback();
            }, res => {
                this.$Message.error(res.msg);
                item.loading = false;
            });
        }
    },
    mounted() {
        /**name:[Major,Class,] | v:[Info_Gender,Info_Nation,Info_IdCardType,Info_ResidenceType,Info_PoliticStatus,Info_BloodType,Info_HealthState,Info_MarryState,Info_Faith,Info_Gatq,XjInfo_StudentType,From_EnrollWay,From_StudentSource,From_OnStudyWay,]**/
        this.$api.get("/StandardDictionary/Many", {
            keys: ""
        }, res => this.ui.dics = res.data);
        this.$api.get("/Region/GetChilds", null, res => {
            this.ui.regions1 = res.data.map(x => {
                return {
                    value: x.value,
                    label: x.label,
                    children: x.children,
                    loading: x.loading
                };
            });
            this.ui.regions2 = res.data.map(x => {
                return {
                    value: x.value,
                    label: x.label,
                    children: x.children,
                    loading: x.loading
                };
            });
            this.ui.regions3 = res.data.map(x => {
                return {
                    value: x.value,
                    label: x.label,
                    children: x.children,
                    loading: x.loading
                };
            });
            this.ui.regions4 = res.data.map(x => {
                return {
                    value: x.value,
                    label: x.label,
                    children: x.children,
                    loading: x.loading
                };
            });
        })
    },
    created() {
        this.page = this.$api.createPage("/null/Page");
        this.target = this.$api.createCommonLogicObj('/null', {
            major: {
                rid: null,
                name: null,
                length: 0
            },
            class: {
                rid: null, name: null, enrollYear: 0
            },
            info_Gender: {
                k: null,
                v: null
            },
            info_Nation: {
                k: null,
                v: null
            },
            info_IdCardType: {
                k: null,
                v: null
            },
            info_ResidenceType: {
                k: null,
                v: null
            },
            info_PoliticStatus: {
                k: null,
                v: null
            },
            info_BloodType: {
                k: null,
                v: null
            },
            info_HealthState: {
                k: null,
                v: null
            },
            info_MarryState: {
                k: null,
                v: null
            },
            info_Faith: {
                k: null,
                v: null
            },
            info_Gatq: {
                k: null,
                v: null
            },
            info_NativePlace: {
                str: null,
                codes: [null],
                names: [null]
            },
            info_ResidencePlace: {
                str: null,
                codes: [null],
                names: [null]
            },
            info_BirthPlace: {
                str: null,
                codes: [null],
                names: [null]
            },
            xjInfo_EnrollYM: {
                y: 0,
                m: 0
            },
            xjInfo_StudentType: {
                k: null,
                v: null
            },
            from_EnrollWay: {
                k: null,
                v: null
            },
            from_Region: {
                str: null,
                codes: [null],
                names: [null]
            },
            from_StudentSource: {
                k: null,
                v: null
            },
            from_OnStudyWay: {
                k: null,
                v: null
            },
            info_Name: null,
            info_Idno: null,
            info_NameEn: null,
            info_NamePy: null,
            info_NamePrevious: null,
            info_Birthday: null,
            info_Country: null,
            info_Advantage: null,
            info_ResidenceAddress: null,
            info_PoliceStation: null,
            link_Phone: null,
            link_Email: null,
            link_CommunicateNo: null,
            link_PersonalSite: null,
            link_Address: null,
            link_Zipcode: null,
            otherInfo_IsFlow: false,
            otherInfo_IsFollowMove: false,
            otherInfo_TrainRoute: null,
            xjInfo_Xh: null,
            xjInfo_Xjh: null,
            xjInfo_Grade: 0,
            xjInfo_EnrollTime: null,
            from_SourcePeriod: null,
            status: null,
            msg: null
        });
        this.target.detail.beforeShow = (obj) => { };
        this.target.add.beforeEditShow = (obj) => {
            if (obj.major) obj.major = this.ui.dics.Major.find(x => x.k == obj.major.name);
            if (obj.class) obj.class = this.ui.dics.Class.find(x => x.k == obj.class.name);
            if (obj.info_Gender) obj.info_Gender = this.ui.dics.Info_Gender.find(x => x.k == obj.info_Gender.k);
            if (obj.info_Nation) obj.info_Nation = this.ui.dics.Info_Nation.find(x => x.k == obj.info_Nation.k);
            if (obj.info_IdCardType) obj.info_IdCardType = this.ui.dics.Info_IdCardType.find(x => x.k == obj.info_IdCardType.k);
            if (obj.info_ResidenceType) obj.info_ResidenceType = this.ui.dics.Info_ResidenceType.find(x => x.k == obj.info_ResidenceType.k);
            if (obj.info_PoliticStatus) obj.info_PoliticStatus = this.ui.dics.Info_PoliticStatus.find(x => x.k == obj.info_PoliticStatus.k);
            if (obj.info_BloodType) obj.info_BloodType = this.ui.dics.Info_BloodType.find(x => x.k == obj.info_BloodType.k);
            if (obj.info_HealthState) obj.info_HealthState = this.ui.dics.Info_HealthState.find(x => x.k == obj.info_HealthState.k);
            if (obj.info_MarryState) obj.info_MarryState = this.ui.dics.Info_MarryState.find(x => x.k == obj.info_MarryState.k);
            if (obj.info_Faith) obj.info_Faith = this.ui.dics.Info_Faith.find(x => x.k == obj.info_Faith.k);
            if (obj.info_Gatq) obj.info_Gatq = this.ui.dics.Info_Gatq.find(x => x.k == obj.info_Gatq.k);
            if (obj.xjInfo_StudentType) obj.xjInfo_StudentType = this.ui.dics.XjInfo_StudentType.find(x => x.k == obj.xjInfo_StudentType.k);
            if (obj.from_EnrollWay) obj.from_EnrollWay = this.ui.dics.From_EnrollWay.find(x => x.k == obj.from_EnrollWay.k);
            if (obj.from_StudentSource) obj.from_StudentSource = this.ui.dics.From_StudentSource.find(x => x.k == obj.from_StudentSource.k);
            if (obj.from_OnStudyWay) obj.from_OnStudyWay = this.ui.dics.From_OnStudyWay.find(x => x.k == obj.from_OnStudyWay.k);
        };
    },
};
</script>
